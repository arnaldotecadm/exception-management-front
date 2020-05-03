import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { SoftwareInterface } from './software.interface';

const apiURL = environment.API_AUTH;

@Injectable({ providedIn: 'root' })
export class SoftwareService {
  constructor(private http: HttpClient) {}

  getSoftwareByPublicKey(publicKey: string) {
    return this.http.get<SoftwareInterface>(
      apiURL + '/software/publickey/' + publicKey
    );
  }
}
