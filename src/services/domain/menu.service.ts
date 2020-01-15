import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Rx";
import { API_CONFIG } from "../../config/api.config";
import { StorageService } from "../storage.service";
import { ProcessoDto } from "../../models/processo.dto";

@Injectable() //possibilita a injeção do serviço
export class MenuService {

    constructor(
        public http: HttpClient,
        public storage: StorageService) {
    }

    findByPerfil(perfil : string) : Observable<ProcessoDto[]>  {
        return this.http.get<ProcessoDto[]>
            (`${API_CONFIG.apiUrl}/processo/${perfil}/processos`);
    }


}