import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { UsuarioService } from '../../services/domain/usuario.service';
import { UsuarioDto } from '../../models/usuario.dto';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppModule } from '../../app/app.module';

@IonicPage()
@Component({
  selector: 'page-usuario',
  templateUrl: 'usuario.html',
})
export class UsuarioPage {

  usuario: UsuarioDto;
  fg: FormGroup;
  desabilita : boolean;
  excluir: boolean;
  loader: any;
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public usuarioService: UsuarioService ) {

      this.fg = this.formBuilder.group({
        id:    ['', [Validators.min(1)]],
        codigo:['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
        nome:  ['', []],
        email: ['', []],
        cpf:   ['', [Validators.required, Validators.minLength(11), Validators.maxLength(14)]],
        sexo:  ['', [Validators.required, Validators.minLength(1), Validators.maxLength(1)]],
        ativo: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(1)]]
      });

  }

  //Executado na abertura da página
  ionViewDidLoad() {

    AppModule.setAtualizou("N");
     // obtém o id do usuário que foi passado como parametro
     this.excluir = false;
     let id = this.navParams.get('user_id');

    if (id == null) {
      this.fg.controls.ativo.setValue('N');
      this.desabilita = false;
      console.log("Inclusão de usuário")
    } else {
      this.desabilita = true;
      console.log("Alteração de usuário")
      this.usuarioService.findById(id) //chamada assincrona da função
      .subscribe(
        response => { //função executa na resposta, se tudo ok
          this.usuario = response; //captura os usuários
          this.setValues();
        },
        error => {}); //função executada se der erro 
    }    
  }

  //atribui valores aos campos
  setValues() {
    this.fg.controls.id.setValue(this.usuario.id);
    this.fg.controls.codigo.setValue(this.usuario.codigo);
    this.fg.controls.nome.setValue(this.usuario.nome);
    this.fg.controls.cpf.setValue(this.usuario.cpf);
    this.fg.controls.email.setValue(this.usuario.email);
    this.fg.controls.sexo.setValue(this.usuario.sexo);
    this.fg.controls.ativo.setValue(this.usuario.ativo);
   
    if (this.usuario.ativo == 'N') {
      this.excluir = true;
    }

  }

  delete() {
    this. loader = this.presentLoading('Encluindo...');
    this.usuarioService.delete(this.fg.controls.id.value)
    .subscribe(response => {
      this.loader.dismiss();
      this.showMessage('Exclusão efetuada com sucesso');
      AppModule.setAtualizou("S");
    },
    error => {this.loader.dismiss();});        
  }

  save() {
    console.log(this.fg.value);   
    this. loader = this.presentLoading('Salvando...');
    if (this.fg.controls.id.value == "") {
      this.insert();
    } else {
      this.update();
    } 
  }

  insert() {
    console.log("Inserindo"); 
    this.usuarioService.insert(this.fg.value)
    .subscribe(response => {
      this.loader.dismiss();
      this.showMessage('Inclusão efetuada com sucesso');
      AppModule.setAtualizou("S");
    },
    error => {/*Não precisa tratar erros do back end, pois
    já existe um tratamento de erros global na classe error-interceptor.ts */
    this.loader.dismiss();});
  }      

  update() {
    console.log("Alterando"); 
    this.usuarioService.update(this.fg.value)
    .subscribe(response => {
      this.loader.dismiss();
      this.showMessage('Alteração efetuada com sucesso');  
      AppModule.setAtualizou("S");    
    },
    error => {this.loader.dismiss();});    
   
  }      

  showMessage(msg: string) {
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

  presentLoading(msg: string) {
    let loader = this.loadingCtrl.create({
      content: msg
    });
    loader.present();
    return loader;
  }


}
