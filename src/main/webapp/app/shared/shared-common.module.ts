import { NgModule, LOCALE_ID } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { registerLocaleData } from '@angular/common';
import locale from '@angular/common/locales/en';

import {
    Jhiptruffle2SharedLibsModule,
    JhiAlertComponent,
    JhiAlertErrorComponent
} from './';

@NgModule({
    imports: [
        Jhiptruffle2SharedLibsModule
    ],
    declarations: [
        JhiAlertComponent,
        JhiAlertErrorComponent
    ],
    providers: [
        Title,
        {
            provide: LOCALE_ID,
            useValue: 'en'
        },
    ],
    exports: [
        Jhiptruffle2SharedLibsModule,
        JhiAlertComponent,
        JhiAlertErrorComponent
    ]
})
export class Jhiptruffle2SharedCommonModule {
    constructor() {
        registerLocaleData(locale);
    }
}
