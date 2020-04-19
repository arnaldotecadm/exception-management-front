import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpSentEvent, HttpUserEvent, HttpResponse, HttpProgressEvent, HttpHeaderResponse, HttpHeaders, HttpErrorResponse, HttpEvent } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError, map, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { SessionManagementService } from './session-management.service';
import { HomeService } from '../../home/home.service';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

    constructor(private sessionManagementService: SessionManagementService, private homeService: HomeService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpSentEvent
        | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {

        return next.handle(req);

    }
}