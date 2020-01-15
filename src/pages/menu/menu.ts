import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProcessoDto } from '../../models/processo.dto';
import { MenuService } from '../../services/domain/menu.service';
import { StorageService } from '../../services/storage.service';
import { API_CONFIG } from '../../config/api.config';

@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {
 
  bucketUrl : string = API_CONFIG.imgUrl;
  
  processos: ProcessoDto[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public menuService: MenuService,
    public storage: StorageService) {
  }

  ionViewDidLoad() {
    this.menuService.findByPerfil(this.storage.getLocalUser().perfil)
    .subscribe(
      response => { 
        this.processos = response; 
      },
      error => {}); //função executada se der erro (nada faz por enquanto)

  }

}
