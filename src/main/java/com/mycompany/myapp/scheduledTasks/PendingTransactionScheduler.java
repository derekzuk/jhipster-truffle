package com.mycompany.myapp.scheduledTasks;

import com.mycompany.myapp.domain.Image;
import com.mycompany.myapp.domain.PendingTransaction;
import com.mycompany.myapp.repository.ImageRepository;
import com.mycompany.myapp.repository.PendingTransactionRepository;
import com.mycompany.myapp.repository.UserRepository;
import com.mycompany.myapp.service.MailService;
import com.mycompany.myapp.service.UserService;
import com.mycompany.myapp.web.rest.AccountResource;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.core.methods.response.EthGetTransactionReceipt;
import org.web3j.protocol.core.methods.response.TransactionReceipt;
import org.web3j.protocol.http.HttpService;

import java.util.List;
import java.util.Optional;
import java.util.concurrent.ExecutionException;

@Component
public class PendingTransactionScheduler {

    private final Logger log = LoggerFactory.getLogger(PendingTransactionScheduler.class);

    private final PendingTransactionRepository pendingTransactionRepository;

    private final ImageRepository imageRepository;

    public PendingTransactionScheduler(PendingTransactionRepository pendingTransactionRepository, ImageRepository imageRepository) {
        this.imageRepository = imageRepository;
        this.pendingTransactionRepository = pendingTransactionRepository;
    }

    @Scheduled(fixedRate = 60000)
    public void processPendingTransactions() throws ExecutionException, InterruptedException {
        // Retrieve pending_transaction table results
        List<PendingTransaction> pendingTransactionSchedulerList = pendingTransactionRepository.findAll();
        log.debug("Found " + pendingTransactionSchedulerList.size() + " pending transactions");

        // cycle through the results and check the transaction receipt
        Web3j web3 = Web3j.build(new HttpService());
        for (PendingTransaction pendingTransaction : pendingTransactionSchedulerList) {
            log.debug("Processing pending transaction: " + pendingTransaction.toString());
            Optional<TransactionReceipt> transactionReceipt = web3.ethGetTransactionReceipt(pendingTransaction.getTransactionHash()).sendAsync().get().getTransactionReceipt();

            if (transactionReceipt.isPresent()) {
                // Update vote count
                Image imageToBeUpvoted = imageRepository.findOne(pendingTransaction.getImage().getId());
                log.debug("Image to be upvoted: " + imageToBeUpvoted.toString());
                imageToBeUpvoted.setUpvoteCount(imageToBeUpvoted.getUpvoteCount() + 1);
                imageRepository.save(imageToBeUpvoted);

                // delete pending transaction record
                pendingTransactionRepository.delete(pendingTransaction.getId());
            }
        }

    }

}
