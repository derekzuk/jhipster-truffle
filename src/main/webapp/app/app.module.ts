import './vendor.ts';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Ng2Webstorage } from 'ngx-webstorage';

import { Jhiptruffle2SharedModule, UserRouteAccessService } from './shared';
import { Jhiptruffle2AppRoutingModule} from './app-routing.module';
import { Jhiptruffle2HomeModule } from './home/home.module';
import { Jhiptruffle2AdminModule } from './admin/admin.module';
import { Jhiptruffle2AccountModule } from './account/account.module';
import { Jhiptruffle2EntityModule } from './entities/entity.module';
import { customHttpProvider } from './blocks/interceptor/http.provider';
import { PaginationConfig } from './blocks/config/uib-pagination.config';

// jhipster-needle-angular-add-module-import JHipster will add new module here

import {
    JhiMainComponent,
    NavbarComponent,
    FooterComponent,
    ProfileService,
    PageRibbonComponent,
    ErrorComponent
} from './layouts';

@NgModule({
    imports: [
        BrowserModule,
        Jhiptruffle2AppRoutingModule,
        Ng2Webstorage.forRoot({ prefix: 'jhi', separator: '-'}),
        Jhiptruffle2SharedModule,
        Jhiptruffle2HomeModule,
        Jhiptruffle2AdminModule,
        Jhiptruffle2AccountModule,
        Jhiptruffle2EntityModule,
        // jhipster-needle-angular-add-module JHipster will add new module here
    ],
    declarations: [
        JhiMainComponent,
        NavbarComponent,
        ErrorComponent,
        PageRibbonComponent,
        FooterComponent
    ],
    providers: [
        ProfileService,
        customHttpProvider(),
        PaginationConfig,
        UserRouteAccessService
    ],
    bootstrap: [ JhiMainComponent ]
})
export class Jhiptruffle2AppModule {}
