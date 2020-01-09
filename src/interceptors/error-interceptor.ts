import { Injectable } from "@angular/core";
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from "rxjs/Rx";
import { StorageService } from "../services/storage.service";
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { FieldMessage } from "../models/field_message";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(public storage: StorageService, public alertCtrl: AlertController) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        return next.handle(req)
        .catch((error, caught) => {

            let errorObj = error;
            if (errorObj.error) { //se o objeto contiver o campo error
                errorObj = errorObj.error;
            }

            if (!errorObj.status) { //se o objeto não contiver o campo status, não é um json
                errorObj = JSON.parse(errorObj);
            }

            console.log("Erro detectado pelo interceptor:");
            console.log(errorObj);

            switch(errorObj.status) {

                case 401:
                    this.handle401();
                    break;

                case 403:
                    this.handle403();
                    break;

                case 422:
                    this.handle422(errorObj);
                    break;
        
                default:
                    this.handleDefaultEror(errorObj);
            }

            return Observable.throw(errorObj);
        }) as any;
    }

    handle401() {
        let alert = this.alertCtrl.create({
            title: 'Erro 401: falha de autenticação',
            message: 'Código ou senha incorretos',
            enableBackdropDismiss: false,
            buttons: [
                {
                    text: 'Ok'
                }
            ]
        });
        alert.present();
    }

    //tratamento do erro 403 (requisição não autorizada)
    handle403() {
        this.storage.setLocalUser(null); //apenas limpa o localStorage
    }


    handle422(errorObj) {
        let alert = this.alertCtrl.create({
            title: 'Erro 422: Validação',
            message: this.listaErros(errorObj.errors),
            enableBackdropDismiss: false,
            buttons: [
                {
                    text: 'Ok'
                }
            ]
        });
        alert.present();
    }

    private listaErros(messages : FieldMessage[]) : string {
        let s : string = '';
        for (var i=0; i<messages.length; i++) {
            s = s + '<p><strong>' + messages[i].campo + "</strong>: " + messages[i].mensagem + '</p>';
        }
        return s;
    }

    handleDefaultEror(errorObj) {
        let alert = this.alertCtrl.create({
            title: 'Erro ' + errorObj.status + ': ' + errorObj.error,
            message: errorObj.message,
            enableBackdropDismiss: false,
            buttons: [
                {
                    text: 'Ok'
                }
            ]
        });
        alert.present();        
    }

}

export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,
};
