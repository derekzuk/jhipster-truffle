import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { ImageComponent } from './image.component';
import { DisplayImageComponent } from './display-image.component';
import { ImageDetailComponent } from './image-detail.component';
import { ImagePopupComponent } from './image-dialog.component';
import { ImageDeletePopupComponent } from './image-delete-dialog.component';

export const imageRoute: Routes = [
    {
        path: 'image',
        component: ImageComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Images'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'image/display-image',
        component: DisplayImageComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Display Images'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const imagePopupRoute: Routes = [
    {
        path: 'image-new',
        component: ImagePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Images'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'image/:id/edit',
        component: ImagePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Images'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'image/:id/delete',
        component: ImageDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Images'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
