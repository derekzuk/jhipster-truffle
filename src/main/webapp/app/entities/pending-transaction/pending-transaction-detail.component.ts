import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { PendingTransaction } from './pending-transaction.model';
import { PendingTransactionService } from './pending-transaction.service';

@Component({
    selector: 'jhi-pending-transaction-detail',
    templateUrl: './pending-transaction-detail.component.html'
})
export class PendingTransactionDetailComponent implements OnInit, OnDestroy {

    pendingTransaction: PendingTransaction;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private pendingTransactionService: PendingTransactionService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInPendingTransactions();
    }

    load(id) {
        this.pendingTransactionService.find(id).subscribe((pendingTransaction) => {
            this.pendingTransaction = pendingTransaction;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInPendingTransactions() {
        this.eventSubscriber = this.eventManager.subscribe(
            'pendingTransactionListModification',
            (response) => this.load(this.pendingTransaction.id)
        );
    }
}
