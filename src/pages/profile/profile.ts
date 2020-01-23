import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StorageService } from '../../services/storage.service';
import { UsuarioDto } from '../../models/usuario.dto';
import { UsuarioService } from '../../services/domain/usuario.service';
import { API_CONFIG } from '../../config/api.config';
import { Camera, CameraOptions } from '@ionic-native/camera';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  usuario: UsuarioDto;
  picture: string;
  cameraOn: boolean = false;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public storage: StorageService,
    public camera: Camera,
    public usuarioService: UsuarioService) {
  }

    //se localUser não nulo e contiver a propriedade codigo
    //faz uma busca do usuário pelo codigo.
    //Se ocorrer erro de autorização ou na busca do localStorage,
    //redireciona para a página home

  ionViewDidLoad() {
    this.loadData();
  }

  loadData() { 
    let localUser = this.storage.getLocalUser();
    if (localUser && localUser.codigo) {
      this.usuarioService.findByCodigo(localUser.codigo)
        .subscribe(response => {
          this.usuario = response;
          this.getImageIfExists();
        },
        error => {
          if (error.status == 403) {
            this.navCtrl.setRoot('HomePage');
          }
        });
    }
    else {
      this.navCtrl.setRoot('HomePage');
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

  sendPicture() {
    this.usuarioService.uploadPicture(this.picture)
      .subscribe(response => {
        this.picture = null;
        this.getImageIfExists();
      },
      error => {
      });
  }

  cancel() {
    this.picture = null;
  }
  
  getCameraPicture() {

    this.cameraOn = true;

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE
    }
    
    this.camera.getPicture(options).then((imageData) => {
      this.picture = 'data:image/png;base64,' + imageData;
      this.cameraOn = false;
     }, (err) => {
      this.cameraOn = false;
     });
  }
   
}
