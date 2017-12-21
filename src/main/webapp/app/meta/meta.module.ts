import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UtilModule} from '../util/util.module';
import {RouterModule} from '@angular/router';

import {
    metaSenderState,
    MetaSenderComponent
} from './';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    UtilModule,
    RouterModule.forChild(metaSenderState)
  ],
  declarations: [MetaSenderComponent]
})
export class MetaModule {
}
