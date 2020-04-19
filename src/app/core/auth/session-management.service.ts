import { Injectable, NgZone } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { SessionManagementInterface } from "./session-management.interface";

const apiURL = environment.SESSION_API_URL;

@Injectable({ providedIn: "root" })
export class SessionManagementService {

    public sessaoAtiva = false;
    
    constructor(private http: HttpClient) {

    }

    getDetailByUsuario(usuario: string) {
        return this.http.get<SessionManagementInterface[]>(
            apiURL + "/filter/usuario/" + usuario
        );
    }

    getDetailByUuid(uuid: string) {
        return this.http.get<SessionManagementInterface[]>(
            apiURL + "/filter/uuid/" + uuid
        );
    }

    getDetailByIp(ip: string) {
        return this.http.get<SessionManagementInterface[]>(
            apiURL + "/filter/ip/" + ip
        );
    }

    adicionarAcesso(sessao: SessionManagementInterface) {
        return this.http.post(
            apiURL + "/add", sessao
        );
    }

    removerAcessoByUsuario(usuario: string) {
        return this.http.delete(
            apiURL + "/remove/usuario/" + usuario
        );
    }

    removerAcessoByUUID(uuid: string) {
        return this.http.delete(
            apiURL + "/remove/uuid/" + uuid
        );
    }

    cancelarAcessoByIp(ip: string) {
        return this.http.post(
            apiURL + "/cancelar-acesso/ip", ip 
        );
    }

    cancelarAcessoByUUID(uuid: string) {
        return this.http.post(
            apiURL + "/cancelar-acesso/uuid", uuid 
        );
    }
}
