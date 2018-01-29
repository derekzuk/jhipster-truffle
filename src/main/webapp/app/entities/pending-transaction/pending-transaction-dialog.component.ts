import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { PendingTransaction } from './pending-transaction.model';
import { PendingTransactionPopupService } from './pending-transaction-popup.service';
import { PendingTransactionService } from './pending-transaction.service';
import { Image, ImageService } from '../image';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-pending-transaction-dialog',
    templateUrl: './pending-transaction-dialog.component.html'
})
export class PendingTransactionDialogComponent implements OnInit {

    pendingTransaction: PendingTransaction;
    isSaving: boolean;

    images: Image[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private pendingTransactionService: PendingTransactionService,
        private imageService: ImageService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.imageService.query()
            .subscribe((res: ResponseWrapper) => { this.images = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.pendingTransaction.id !== undefined) {
            this.subscribeToSaveResponse(
                this.pendingTransactionService.update(this.pendingTransaction));
        } else {
            this.subscribeToSaveResponse(
                this.pendingTransactionService.create(this.pendingTransaction));
        }
    }

    private subscribeToSaveResponse(result: Observable<PendingTransaction>) {
        result.subscribe((res: PendingTransaction) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: PendingTransaction) {
        this.eventManager.broadcast({ name: 'pendingTransactionListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackImageById(index: number, item: Image) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-pending-transaction-popup',
    template: ''
})
export class PendingTransactionPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private pendingTransactionPopupService: PendingTransactionPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.pendingTransactionPopupService
                    .open(PendingTransactionDialogComponent as Component, params['id']);
            } else {
                this.pendingTransactionPopupService
                    .open(PendingTransactionDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
