import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { PendingTransaction } from './pending-transaction.model';
import { PendingTransactionPopupService } from './pending-transaction-popup.service';
import { PendingTransactionService } from './pending-transaction.service';

@Component({
    selector: 'jhi-pending-transaction-delete-dialog',
    templateUrl: './pending-transaction-delete-dialog.component.html'
})
export class PendingTransactionDeleteDialogComponent {

    pendingTransaction: PendingTransaction;

    constructor(
        private pendingTransactionService: PendingTransactionService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.pendingTransactionService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'pendingTransactionListModification',
                content: 'Deleted an pendingTransaction'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-pending-transaction-delete-popup',
    template: ''
})
export class PendingTransactionDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private pendingTransactionPopupService: PendingTransactionPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.pendingTransactionPopupService
                .open(PendingTransactionDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
