import { Component } from '@angular/core';
import { NavController, IonicPage, MenuController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  //parâmetro para navegação entre páginas
  //todo atributo de classe ou objeto de construtor
  //deve ser referenciado precedido por this

  constructor(public navCtrl: NavController, public menu: MenuController) {

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

  public login() {
       //setRoot abre nova página sem empilhar
    this.navCtrl.setRoot("UsuarioPage");
  }

  //método para abrir a página de alteração de senha
  public senha() {
    //push empilha as páginas e cria botão voltar
    this.navCtrl.push("SenhaPage");
  }

}
