import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StorageService } from '../../services/storage.service';
import { UsuarioDto } from '../../models/usuario.dto';
import { UsuarioService } from '../../services/domain/usuario.service';
import { API_CONFIG } from '../../config/api.config';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  usuario: UsuarioDto;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public storage: StorageService,
    public usuarioService: UsuarioService) {
  }

  ionViewDidLoad() {
    let localUser = this.storage.getLocalUser();
    //se localUser não nulo e contiver a propriedade codigo
    if (localUser && localUser.codigo) {
      this.usuarioService.findByCodigo(localUser.codigo)
        .subscribe(response => {
          this.usuario = response;
          this.getImageIfExists();
        },
        error => {});
    }
  }

  getImageIfExists() {
    this.usuarioService.getImageFromBucket(this.usuario.id)
    .subscribe(response => {      
      this.usuario.imageUrl = `${API_CONFIG.imgUrl}/user${this.usuario.id}.jpg`;
    },
    error => {
      
    });
  }
}
