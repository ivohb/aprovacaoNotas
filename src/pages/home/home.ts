import { Component } from '@angular/core';
import { NavController, IonicPage, MenuController } from 'ionic-angular';
import { LoginDto } from '../../models/login.dto';
import { AuthService } from '../../services/auth.servece';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  //parâmetro para navegação entre páginas
  //todo atributo de classe ou objeto de construtor
  //deve ser referenciado precedido por this

  creds : LoginDto = {
    codigo: "",
    senha: ""
  };

  constructor(
    public navCtrl: NavController, 
    public menu: MenuController,
    public auth: AuthService) {

  }


  //ao entrar na página, desabilita menu
  //como a página home é a página de login, não deve ter menu
  ionViewWillEnter() {
    this.menu.swipeEnable(false);
    }
  
  //ao sair da página, habilita menu
  ionViewDidLeave() {
    this.menu.swipeEnable(true);
  }

  //Se o token ainda estiver ativo, vai direto para
  //a página inicial, sem passar pela tela de login
  ionViewDidEnter() {
    this.auth.refreshToken()
      .subscribe(response => {
        this.auth.successfulLogin(response.headers.get('Authorization'));
        this.navCtrl.setRoot('UsuarioPage');
      },
      error => {});  
  }

  public login() {
    this.auth.autenticacao(this.creds)
      .subscribe(response => {
        this.auth.successfulLogin(response.headers.get('Authorization'));
        this.navCtrl.setRoot("UsuarioPage"); //setRoot abre nova página sem empilhar
      },
      error => {
        console.log("Back end fora do ar");
        this.navCtrl.setRoot("UsuarioPage");
      }); 
       
    
  }

  //método para abrir a página de alteração de senha
  public esqueciSenha() {
    //push empilha as páginas e cria botão voltar
    this.navCtrl.push("EsquecisenhaPage");
  }

}
