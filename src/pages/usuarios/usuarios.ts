import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UsuarioService } from '../../services/domain/usuario.service';
import { UsuarioDto } from '../../models/usuario.dto';
import { API_CONFIG } from '../../config/api.config';

@IonicPage()
@Component({
  selector: 'page-usuarios',
  templateUrl: 'usuarios.html',
})
export class UsuariosPage {

  bucketUrl : string = API_CONFIG.imgUrl;
  
  usuarios : UsuarioDto[]; //declaração de uma coleção de usuários

  //para criar uma instãncia de um recurso qualquer,
  //basta incluír o recurso no construtor da classe.
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public usuarioService: UsuarioService) {
  }

  //na carga da página
  ionViewDidLoad() {
    this.usuarioService.findAll() //chamada assincrona da função
      .subscribe(
        response => { //função executa na resposta, se tudo ok
          this.usuarios = response; //captura os usuários
        },
        error => {}); //função executada se der erro (nada faz por enquanto)
  }

  showUser(id: string) {
  //abre a pagina de usuário, passando o id do mesmo
  //nome do parametro : valor do parametro
  this.navCtrl.push('UsuarioPage' , {user_id: id});    
  }

}
