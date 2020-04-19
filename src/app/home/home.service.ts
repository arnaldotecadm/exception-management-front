import { Injectable, NgZone } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { GraphByMonth, GraphGrouppedByType, GraphModel } from "./graph-by-month.interface";
import { ExceptionTotalInterface } from "./graph/exception-total.interface";
import { v4 as uuid } from 'uuid';

const apiURL = environment.API_URL;
const UUID_GERAL = uuid();

@Injectable({ providedIn: "root" })
export class HomeService {

  localIp = sessionStorage.getItem('LOCAL_IP');

  private ipRegex = new RegExp(/(\d[0-9]*)/);

  public getIdentificador(): string{
    return 'IP_LOCAL: ' + this.localIp + ' - Identificador: ' + UUID_GERAL;
  }

  public getLocalIpAddress(): string{
    return this.localIp;
  }

  public getUUID(): string{
    return UUID_GERAL;
  }

  private determineLocalIp() {
    window.RTCPeerConnection = this.getRTCPeerConnection();

    const pc = new RTCPeerConnection({ iceServers: [] });
    pc.createDataChannel('');
    pc.createOffer().then(pc.setLocalDescription.bind(pc));

    pc.onicecandidate = (ice) => {
      this.zone.run(() => {
        if (!ice || !ice.candidate || !ice.candidate.candidate) {
          return;
        }

        this.localIp = this.ipRegex.exec(ice.candidate.candidate)[0];
        sessionStorage.setItem('LOCAL_IP', this.localIp);

        pc.onicecandidate = () => {};
        pc.close();
      });
    };
  }

  private getRTCPeerConnection() : any {
    return window.RTCPeerConnection ||
      window.webkitRTCPeerConnection;
  }





  constructor(private http: HttpClient, private zone: NgZone) {
    this.determineLocalIp();
  }

  getDetailByType(application: string, exceptionType: string) {
    if (!application) {
      application = "none";
    }

    if (!exceptionType) {
      exceptionType = "none";
    }

    return this.http.get<GraphModel[]>(
      apiURL + "/getGrouppedByMonth/" + application + "/" + exceptionType
    );
  }

  getGrouppedByMonth(application: string, typeLimit: number) {
    if (!application) {
      application = "none";
    }

    return this.http.get<GraphByMonth[]>(
      apiURL + "/getGrouppedByMonthV2/" + application + "/" + typeLimit
    );
  }

  getTotalException() {
    return this.http.get<ExceptionTotalInterface[]>(apiURL + "/totalException");
  }

  getTopTrendExceptionName(typeLimit: number) {
    return this.http.get<string[]>(
      apiURL + "/top-trend-exception-name/" + typeLimit
    );
  }

  getTopTrendExceptionDetail(application: string, typeLimit: number) {
    if (!application) {
      application = "none";
    }
    return this.http.get<GraphByMonth[]>(
      apiURL + "/top-trend-exception-detail/" + application + "/" + typeLimit
    );
  }

  getAllPercentages(application: string) {
    if (!application) {
      application = "none";
    }
    return this.http.get<GraphGrouppedByType[]>(
      apiURL + "/getAllPercentages/" + application
    );
  }
}
