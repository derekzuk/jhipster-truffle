import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { Jhiptruffle2ImageModule } from './image/image.module';
import { Jhiptruffle2PendingTransactionModule } from './pending-transaction/pending-transaction.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        Jhiptruffle2ImageModule,
        Jhiptruffle2PendingTransactionModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Jhiptruffle2EntityModule {}
