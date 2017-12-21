import { Routes } from '@angular/router';

import {
    metaSenderRoute
} from './';

const META_SENDER_ROUTE = [
    metaSenderRoute
];

export const metaSenderState: Routes = [{
    path: '',
    children: META_SENDER_ROUTE
}];
