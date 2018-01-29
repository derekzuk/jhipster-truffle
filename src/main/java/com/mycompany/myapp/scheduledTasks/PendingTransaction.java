package com.mycompany.myapp.scheduledTasks;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class PendingTransaction {

    @Scheduled(fixedRate = 5000)
    public void processPendingTransactions() {


    }

}
