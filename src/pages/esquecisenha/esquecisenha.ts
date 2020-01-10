import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-esquecisenha',
  templateUrl: 'esquecisenha.html',
})
export class EsquecisenhaPage {

  formGroup: FormGroup;
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder) {
      this.formGroup = this.formBuilder.group({
        //valor inicial e as validações sintáticas
        codigo: ['', [Validators.required, Validators.minLength(3)]],
        cpf:    ['', [Validators.required, Validators.minLength(10)]],
        email:  ['', [Validators.required, Validators.email, Validators.maxLength(50)]]
      });
  }

  
  enviar() {
    console.log("Enviar dados");
  }

}
