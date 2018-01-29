package com.mycompany.myapp.scheduledTasks;

import com.mycompany.myapp.domain.PendingTransaction;
import com.mycompany.myapp.repository.ImageRepository;
import com.mycompany.myapp.repository.PendingTransactionRepository;
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

    @Autowired
    PendingTransactionRepository pendingTransactionRepository;

    @Autowired
    ImageRepository imageRepository;

    @Scheduled(fixedRate = 60000)
    public void processPendingTransactions() throws ExecutionException, InterruptedException {
        // Retrieve pending_transaction table results
        List<PendingTransaction> pendingTransactionSchedulerList = pendingTransactionRepository.findAll();

        // cycle through the results and check the transaction receipt
        Web3j web3 = Web3j.build(new HttpService());
        for (PendingTransaction pendingTransaction : pendingTransactionSchedulerList) {
            Optional<TransactionReceipt> transactionReceipt = web3.ethGetTransactionReceipt(pendingTransaction.getTransactionHash()).sendAsync().get().getTransactionReceipt();

            if (transactionReceipt.isPresent()) {
                // Update vote count
                // We need to an the imageId to the pendingTransaction table in order to do this

                // Remove pending_transaction record
            }
        }

    }

}
