import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Jhiptruffle2SharedModule } from '../../shared';
import {
    ImageService,
    ImagePopupService,
    ImageComponent,
    ImageDetailComponent,
    ImageDialogComponent,
    ImagePopupComponent,
    ImageDeletePopupComponent,
    ImageDeleteDialogComponent,
    imageRoute,
    imagePopupRoute,
} from './';

const ENTITY_STATES = [
    ...imageRoute,
    ...imagePopupRoute,
];

@NgModule({
    imports: [
        Jhiptruffle2SharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ImageComponent,
        ImageDetailComponent,
        ImageDialogComponent,
        ImageDeleteDialogComponent,
        ImagePopupComponent,
        ImageDeletePopupComponent,
    ],
    entryComponents: [
        ImageComponent,
        ImageDialogComponent,
        ImagePopupComponent,
        ImageDeleteDialogComponent,
        ImageDeletePopupComponent,
    ],
    providers: [
        ImageService,
        ImagePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Jhiptruffle2ImageModule {}
