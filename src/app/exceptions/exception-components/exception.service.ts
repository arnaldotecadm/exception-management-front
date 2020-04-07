import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ExceptionModel } from './exceptionModel';

const apiURL = environment.API_URL;

@Injectable({ providedIn: 'root' })
export class ExceptionService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<ExceptionModel[]>(apiURL + '/all');
  }

}
