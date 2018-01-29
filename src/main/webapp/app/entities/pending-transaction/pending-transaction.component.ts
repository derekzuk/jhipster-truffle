import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { PendingTransaction } from './pending-transaction.model';
import { PendingTransactionService } from './pending-transaction.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-pending-transaction',
    templateUrl: './pending-transaction.component.html'
})
export class PendingTransactionComponent implements OnInit, OnDestroy {
pendingTransactions: PendingTransaction[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private pendingTransactionService: PendingTransactionService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.pendingTransactionService.query().subscribe(
            (res: ResponseWrapper) => {
                this.pendingTransactions = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInPendingTransactions();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: PendingTransaction) {
        return item.id;
    }
    registerChangeInPendingTransactions() {
        this.eventSubscriber = this.eventManager.subscribe('pendingTransactionListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
