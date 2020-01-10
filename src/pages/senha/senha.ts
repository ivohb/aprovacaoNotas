import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-senha',
  templateUrl: 'senha.html',
})
export class SenhaPage {

  formGroup: FormGroup;
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder) {
      this.formGroup = this.formBuilder.group({
        novaSenha: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(15)]],
        confirmaSenha: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(15)]]
      });
  }

  ionViewDidLoad() {
    //executado quando a página é carregada
  }

  alterarSenha() {
    console.log("alterarsenha");
  }
  
}
