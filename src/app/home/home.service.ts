import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { GraphByMonth, GraphGrouppedByType } from "./graph-by-month.interface";
import { ExceptionTotalInterface } from "./graph/exception-total.interface";

const apiURL = environment.API_URL;

@Injectable({ providedIn: "root" })
export class HomeService {
  constructor(private http: HttpClient) {}

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

  getAllPercentages() {
    return this.http.get<GraphGrouppedByType[]>(apiURL + "/getAllPercentages");
  }
}
