import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
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
  esconde: boolean;
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public alertCtrl: AlertController,
    public usuarioService: UsuarioService ) {

      this.fg = this.formBuilder.group({
        id:    ['', [Validators.min(1)]],
        codigo:['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
        nome:  ['', []],
        email: ['', [Validators.required, Validators.email, Validators.maxLength(50)]],
        cpf:  ['', [Validators.required, Validators.minLength(11), Validators.maxLength(14)]],
        sexo: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(1)]]
      });

  }

  //Executado na abertura da página
  ionViewDidLoad() {
    AppModule.setAtualizou("N");
     // obtém o id do usuário que foi passado como parametro
    let id = this.navParams.get('user_id');

    if (id == null) {
      this.desabilita = false;
      this.esconde = true;
    } else {
      this.desabilita = true;
      this.esconde = false;
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
  }

  delete() {
    console.log(this.fg.controls.id.value);    
    this.usuarioService.delete(this.fg.controls.id.value)
    .subscribe(response => {
      this.showSucesso('Exclusão efetuada com sucesso');
      AppModule.setAtualizou("S");
    },
    error => {});

  }

  save() {
    console.log(this.fg.value);   
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
      this.showSucesso('Inclusão efetuada com sucesso');
      AppModule.setAtualizou("S");
    },
    error => {/*Não precisa tratar erros do back end, pois
    já existe um tratamento de erros global na classe error-interceptor.ts */});
  }      

  update() {
    console.log("Alterando"); 
    this.usuarioService.update(this.fg.value)
    .subscribe(response => {
      this.showSucesso('Alteração efetuada com sucesso');  
      AppModule.setAtualizou("S");    
    },
    error => {});    
   
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
