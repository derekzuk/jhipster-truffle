import { Route } from '@angular/router';

import { ImageComponent } from '../image.component';

export const registerRoute: Route = {
    path: 'display-image',
    component: ImageComponent,
    data: {
        authorities: [],
        pageTitle: 'Display Image'
    }
};
