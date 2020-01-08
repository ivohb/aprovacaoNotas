import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UsuarioService } from '../../services/domain/usuario.service';
import { UsuarioDto } from '../../models/usuario.dto';
import { API_CONFIG } from '../../config/api.config';

@IonicPage()
@Component({
  selector: 'page-usuario',
  templateUrl: 'usuario.html',
})
export class UsuarioPage {

  bucketUrl : string = API_CONFIG.imgUrl;
  
  usuarios : UsuarioDto[]; //declaração de uma coleção de usuários

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
        error => { //função executada na resposta, no caso de erro
          console.log(error); //exibe o erro no console
        }
      );
  }


}
