import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SenhaPage } from './senha';

@NgModule({
  declarations: [
    SenhaPage,
  ],
  imports: [
    IonicPageModule.forChild(SenhaPage),
  ],
})
export class SenhaPageModule {}
