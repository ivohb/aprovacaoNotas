import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { LoginDto } from "../models/login.dto";
import { ForgotDto } from "../models/forgot.dto";
import { API_CONFIG } from "../config/api.config";
import { StorageService } from "./storage.service";
import { LocalUser } from "../models/local_user";
// npm install @auth0/angular-jwt
import { JwtHelperService  } from '@auth0/angular-jwt';

@Injectable()
export class AuthService {

    //será usado para extrair o codigo do usuario a partir do token

    jwtHelper: JwtHelperService  = new JwtHelperService ();

    constructor(
        public http: HttpClient,
        public storage: StorageService) {
    }

    autenticacao(creds : LoginDto) {
        return this.http.post(
            `${API_CONFIG.apiUrl}/login`, 
            creds,
            {
                observe: 'response', //utilizado para obter a resposta
                responseType: 'text' //infomra ao fremework que a resposta não é um json
            });
    }

    forgot(obj : ForgotDto) {
        return this.http.post(
            `${API_CONFIG.apiUrl}auth//forgot`, 
            obj,
            { 
                observe: 'response', 
                responseType: 'text'
            }
        ); 
    }

    refreshToken() {
        return this.http.post(
            `${API_CONFIG.apiUrl}/auth/refresh_token`, 
            {}, //não tem parâmetros
            {
                observe: 'response',
                responseType: 'text'
            });
    }

    successfulLogin(token : string, profile : string) {
        let tok = token.substring(7); //obtem token sem o prefixo Bearer
        let user : LocalUser = { //cria obj user com token
            token: tok,
            codigo: this.jwtHelper.decodeToken(tok).sub,
            perfil: profile
        };
        this.storage.setLocalUser(user); //armazena no localStorage
    }

    logout() {
        this.storage.setLocalUser(null); //remove usuario do localStorage
    }

}
