import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
//import { Observable } from "rxjs/Observable"; contém erro, usar a importação abaixo
import { Observable } from "rxjs/Rx";
import { UsuarioDto } from "../../models/usuario.dto";
import { API_CONFIG } from "../../config/api.config";
import { StorageService } from "../storage.service";

//classe responsável pela comunicação com o back end

@Injectable() //possibilita a injeção do serviço
export class UsuarioService {

    constructor(
        public http: HttpClient,
        public storage: StorageService) {
    }

    findAll() : Observable<UsuarioDto[]> {
        //chaada do método get da API sem parâmetros
        return this.http.get<UsuarioDto[]>(`${API_CONFIG.apiUrl}/usuario`);
    }

    findByCodigo(codigo: string) : Observable<UsuarioDto> {
        return this.http.get<UsuarioDto>(
            `${API_CONFIG.apiUrl}/usuario/codigo?codigo=${codigo}`);
    }

    getImageFromBucket(id : string) : Observable<any> {
        let url = `${API_CONFIG.imgUrl}/user${id}.jpg`
        return this.http.get(url, {responseType : 'blob'});
    }

}