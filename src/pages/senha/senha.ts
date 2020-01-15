import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/domain/usuario.service';

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
    public formBuilder: FormBuilder,
    public alertCtrl: AlertController,
    public usuarioService: UsuarioService) {

      this.formGroup = this.formBuilder.group({
        novaSenha:     ['', [Validators.required, Validators.minLength(5), Validators.maxLength(15)]],
        confirmaSenha: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(15)]]
      });
  }

  ionViewDidLoad() {
    //executado quando a página é carregada
  }

  enviar() {
    console.log(this.formGroup.value);    
    this.usuarioService.updateSenha(this.formGroup.value)
    .subscribe(response => {
      this.showSucesso('Operação efetuada com sucesso');
    },
    error => {/*Não precisa tratar erros do back end, pois
    já existe um tratamento de erros global na classe error-interceptor.ts */});
  }

  showSucesso(msg: string) {
    let alert = this.alertCtrl.create({
      title: 'Sucesso!',
      message: msg,
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.navCtrl.pop(); //desempilha a página esquecisenha
          }
        }
      ]
    });
    alert.present();
  }

  
}
