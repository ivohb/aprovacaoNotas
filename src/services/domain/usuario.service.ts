import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
//import { Observable } from "rxjs/Observable"; contém erro, usar a importação abaixo
import { Observable } from "rxjs/Rx";
import { UsuarioDto } from "../../models/usuario.dto";
import { API_CONFIG } from "../../config/api.config";
import { StorageService } from "../storage.service";
import { SenhaDto } from "../../models/senha.dto";

//classe responsável pela comunicação com o back end

@Injectable() //possibilita a injeção do serviço
export class UsuarioService {

    constructor(
        public http: HttpClient,
        public storage: StorageService) {
    }

    findById(id: string) : Observable<UsuarioDto> {
        return this.http.get<UsuarioDto>(
            `${API_CONFIG.apiUrl}/usuario/${id}`);
    }

    findAll() : Observable<UsuarioDto[]> {
        //chaada do método get da API sem parâmetros
        return this.http.get<UsuarioDto[]>(`${API_CONFIG.apiUrl}/usuario`);
    }

    popup() : Observable<UsuarioDto[]> {
        //chaada do método get da API sem parâmetros
        return this.http.get<UsuarioDto[]>(`${API_CONFIG.apiUrl}/usuario/popup`);
    }

    findByCodigo(codigo: string) : Observable<UsuarioDto> {
        return this.http.get<UsuarioDto>(
            `${API_CONFIG.apiUrl}/usuario/codigo?codigo=${codigo}`);
    }

    getImageFromBucket(id : string) : Observable<any> {
        let url = `${API_CONFIG.imgUrl}/user${id}.jpg`
        return this.http.get(url, {responseType : 'blob'});
    }

    insert(obj : UsuarioDto) {
        return this.http.post(
            `${API_CONFIG.apiUrl}/usuario`, 
            obj,
            { 
                observe: 'response', 
                responseType: 'text'
            }
        ); 
    }

    update(obj : UsuarioDto) {
        console.log(obj.id);
        return this.http.put(
            `${API_CONFIG.apiUrl}/usuario/${obj.id}`, 
            obj,
            { 
                observe: 'response', 
                responseType: 'text'
            }
        ); 
    }

    delete(id : string) {
        return this.http.delete(
            `${API_CONFIG.apiUrl}/usuario/${id}`,
            { 
                observe: 'response', 
                responseType: 'text'
            }
        ); 
    }

    updateSenha(obj : SenhaDto) {
        return this.http.patch(
            `${API_CONFIG.apiUrl}/usuario`, 
            obj,
            { 
                observe: 'response', 
                responseType: 'text'
            }
        ); 
    }

}