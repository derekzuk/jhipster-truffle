import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PendingTransactionComponent } from './pending-transaction.component';
import { PendingTransactionDetailComponent } from './pending-transaction-detail.component';
import { PendingTransactionPopupComponent } from './pending-transaction-dialog.component';
import { PendingTransactionDeletePopupComponent } from './pending-transaction-delete-dialog.component';

export const pendingTransactionRoute: Routes = [
    {
        path: 'pending-transaction',
        component: PendingTransactionComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'PendingTransactions'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'pending-transaction/:id',
        component: PendingTransactionDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'PendingTransactions'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const pendingTransactionPopupRoute: Routes = [
    {
        path: 'pending-transaction-new',
        component: PendingTransactionPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'PendingTransactions'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'pending-transaction/:id/edit',
        component: PendingTransactionPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'PendingTransactions'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'pending-transaction/:id/delete',
        component: PendingTransactionDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'PendingTransactions'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
