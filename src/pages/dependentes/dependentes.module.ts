import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DependentesPage } from './dependentes';

@NgModule({
  declarations: [
    DependentesPage,
  ],
  imports: [
    IonicPageModule.forChild(DependentesPage),
  ],
})
export class DependentesPageModule {}
