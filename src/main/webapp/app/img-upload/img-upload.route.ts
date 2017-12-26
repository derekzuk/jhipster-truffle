import { Route } from '@angular/router';

import { ImgUploadComponent } from './';

export const IMG_UPLOAD_ROUTE: Route = {
    path: 'img-upload',
    component: ImgUploadComponent,
    data: {
        authorities: [],
        pageTitle: 'Image Upload'
    }
};
