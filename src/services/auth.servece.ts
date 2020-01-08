import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { LoginDto } from "../models/login.dto";
import { API_CONFIG } from "../config/api.config";
import { StorageService } from "./storage.service";
import { LocalUser } from "../models/local_user";

@Injectable()
export class AuthService {

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

    successfulLogin(authorizationValue : string) {
        let tok = authorizationValue.substring(7); //obtem token sem o prefixo Bearer
        let user : LocalUser = { //cria obj user com token
            token: tok
        };
        this.storage.setLocalUser(user); //armazena no localStorage
    }

    logout() {
        this.storage.setLocalUser(null); //remove usuario do localStorage
    }

}
