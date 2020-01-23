import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UsuarioService } from '../../services/domain/usuario.service';
import { UsuarioDto } from '../../models/usuario.dto';
import { API_CONFIG } from '../../config/api.config';
import { AppModule } from '../../app/app.module';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';

@IonicPage()
@Component({
  selector: 'page-usuarios',
  templateUrl: 'usuarios.html',
})
export class UsuariosPage {

  bucketUrl : string = API_CONFIG.imgUrl;
  usuarios : UsuarioDto[] = []; //declaração de uma coleção de usuários vazia
  page : number = 0;
  qtdPage: number = 0;

  //para criar uma instãncia de um recurso qualquer,
  //basta incluír o recurso no construtor da classe.
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public usuarioService: UsuarioService,
    public loadingCtrl: LoadingController)  {
  }

  //na carga da página
  ionViewDidLoad() {
    this.loadData();
  }

  loadData() {
    let loader = this.presentLoading();
    console.log(this.page)
    this.usuarioService.findPage(this.page, 5) //chamada assincrona da função
      .subscribe(response => { //função executa na resposta, se tudo ok
          //caso queira carregar as imaens so amazon, chamar a funcão 
          //loadImageUrls(start, end);
          //let start = this.usuarios.length;
          //como é uma listagem paginada, os usuários estão na propriedade content
          this.qtdPage = response['totalPages'];
          this.usuarios = this.usuarios.concat(response['content']); 
          //let end = this.usuarios.length;
          loader.dismiss();
          //this.loadImageUrls(start, end);
      },
      error => {
          loader.dismiss();
      }); //função executada se der erro (nada faz por enquanto)

  }

  loadImageUrls(start: number, end: number) {
    for (var i=start; i<=end; i++) {
      let user = this.usuarios[i];
     // this.produtoService.getImageFromBucket(user.id)
     //   .subscribe(response => {
     //     item.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${item.id}-small.jpg`;
     //   },
     //   error => {});
    }
  }  

  showUser(id: string) {
  //abre a pagina de usuário, passando o id do mesmo
  //nome do parametro : valor do parametro
    this.navCtrl.push('UsuarioPage' , {user_id: id});    
  }

  ionViewWillEnter() {
    if (AppModule.getAtualizou() == 'S') {
      this.page = 0;
      this.usuarios = [];  
      this.loadData();       
    }
  }

  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Carregando..."
    });
    loader.present();
    return loader;
  }

  doRefresh(refresher) {
    this.page = 0;
    this.usuarios = [];
    this.loadData();
    setTimeout(() => {
      refresher.complete();
    }, 1000);
  }

  doInfinite(infiniteScroll) {
    console.log(this.page)
    console.log(this.qtdPage)
    this.page++;
    
    if (this.page < this.qtdPage) {
      this.loadData();
    }
    
    setTimeout(() => {
      infiniteScroll.complete();
    }, 1000);

  }

}
