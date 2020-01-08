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
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    //coloquei a instancia desse serviço aqui no módulo principal porque
    //ele será usado em muitas páginas da aplicação. Assim uma instancia unica
    //será criada e utilizada em qualquer parte que recesar.
    UsuarioService,
    ErrorInterceptorProvider,
    AuthService,
    StorageService
  ]
})
export class AppModule {}
