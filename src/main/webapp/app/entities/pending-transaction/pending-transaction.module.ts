import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Jhiptruffle2SharedModule } from '../../shared';
import {
    PendingTransactionService,
    PendingTransactionPopupService,
    PendingTransactionComponent,
    PendingTransactionDetailComponent,
    PendingTransactionDialogComponent,
    PendingTransactionPopupComponent,
    PendingTransactionDeletePopupComponent,
    PendingTransactionDeleteDialogComponent,
    pendingTransactionRoute,
    pendingTransactionPopupRoute,
} from './';

const ENTITY_STATES = [
    ...pendingTransactionRoute,
    ...pendingTransactionPopupRoute,
];

@NgModule({
    imports: [
        Jhiptruffle2SharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        PendingTransactionComponent,
        PendingTransactionDetailComponent,
        PendingTransactionDialogComponent,
        PendingTransactionDeleteDialogComponent,
        PendingTransactionPopupComponent,
        PendingTransactionDeletePopupComponent,
    ],
    entryComponents: [
        PendingTransactionComponent,
        PendingTransactionDialogComponent,
        PendingTransactionPopupComponent,
        PendingTransactionDeleteDialogComponent,
        PendingTransactionDeletePopupComponent,
    ],
    providers: [
        PendingTransactionService,
        PendingTransactionPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Jhiptruffle2PendingTransactionModule {}
