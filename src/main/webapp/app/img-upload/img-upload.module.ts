import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Jhiptruffle2SharedModule } from '../shared';
import { IMG_UPLOAD_ROUTE, ImgUploadComponent, ImageUploadService} from './';

@NgModule({
    imports: [
        Jhiptruffle2SharedModule,
        RouterModule.forChild([ IMG_UPLOAD_ROUTE ])
    ],
    declarations: [
        ImgUploadComponent,
    ],
    entryComponents: [
    ],
    providers: [
        ImageUploadService
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ImgUploadModule {}
