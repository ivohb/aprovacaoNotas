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
  providers: [
    //coloque aqui as instancias de uso exclusivo desse sub-modulo    
  ]

})
export class SenhaPageModule {}
