import { Injectable, EventEmitter } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { ExceptionModel } from "./exceptionModel";
import { PaginacaoInterface } from "./paginacao";

const apiURL = environment.API_URL;

@Injectable({ providedIn: "root" })
export class ExceptionService {
  constructor(private http: HttpClient) {}

  getPaged(pageActual: number, pageSize: number) {
    return this.http.get<PaginacaoInterface>(
      apiURL + "/all?" + "page=" + pageActual + "&size=" + pageSize
    );
  }
}
