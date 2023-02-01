import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { AuthService } from '../_services';
import { environment } from '../../environments/environment';

@Injectable()
export class BasicAuthInterceptor implements HttpInterceptor {
    constructor(
        private authService: AuthService
    ) { }

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        // add authorization header with basic auth credentials if available
        // var checkPortalType = localStorage.getItem('s_t');
        var authToken = JSON.parse(this.authService.getTokenAdmin() || '{}')
        if (authToken && authToken.refresh && authToken.refresh.token) {
            request = request.clone({ setHeaders: { Authorization: `Bearer ${authToken.refresh.token}` } });
        } else {
            request = request.clone({ setHeaders: { Authorization:  environment.getAdminLoginToken } });
        }
        return next.handle(request);
    }
}
