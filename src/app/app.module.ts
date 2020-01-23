import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { UsuarioService } from '../services/domain/usuario.service';
import { ErrorInterceptorProvider } from '../interceptors/error-interceptor';
import { AuthService } from '../services/auth.servece';
import { StorageService } from '../services/storage.service';
import { AuthInterceptorProvider } from '../interceptors/auth-interceptor';
import { MenuService } from '../services/domain/menu.service';
import { ImageUtilService } from '../services/image-util.servece';

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    HttpClientModule, //necessários para as requisições http
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],

    //todo recurso declarado aqui no módulo principal tem
    //escopo global, ou sejam não precisam ser declarados
    //nos providers dos sub módulos que irão utiliza-los
    
    providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UsuarioService,
    AuthInterceptorProvider, //devido a ordem das declarações, o AlthInterceptador
    ErrorInterceptorProvider, //será executado antes do ErrorInterceptador 
    AuthService,
    StorageService,
    MenuService,
    ImageUtilService
  ]
})
export class AppModule {
  private static atualizou: string = "N";

  static getAtualizou(){
    return this.atualizou;
  }
  
  static setAtualizou(atu : string) {
    this.atualizou = atu;
  }

}
