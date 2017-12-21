import { Route } from '@angular/router';

import { MetaSenderComponent } from './meta-sender.component';

export const metaSenderRoute: Route = {
    path: 'meta-sender',
    component: MetaSenderComponent,
    data: {
        authorities: [],
        pageTitle: 'Meta Sender'
    }
};
