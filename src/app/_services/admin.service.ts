import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError, tap, retry } from 'rxjs/operators';
import { environment } from '../../environments/environment';


@Injectable()

export class AdminService {

    constructor(private http: HttpClient) { }

    apiUrl: any = environment.apiUrl;
    IsSideBarShow: boolean = true;

    extractData(res: any) {
        const body = res;
        return body || {};
    }

    // Login
    login(request: any): Observable<any> {
        return this.http.post(`${this.apiUrl}/admin/auth/login`, request).pipe(map(this.extractData));
    }

    // forget Password
    forgotPassword(data: any): Observable<any> {
        return this.http.post(`${this.apiUrl}/admin/auth/forgot-password`, data).pipe(map(this.extractData));
    }
    
    // Reset Password
    resetPassword(token:any,body:any){
        return this.http.post(this.apiUrl+'/admin/auth/reset-password?token='+token, body)
    }

    // Change Password
    changePassword(request: any): Observable<any> {
        return this.http.post(`${this.apiUrl}/admin/auth/change-password`, request).pipe(map(this.extractData));
    }

    // Edit profile
    updateAdmin(request: any): Observable<any> {
        return this.http.patch(`${this.apiUrl}/admin/auth/editprofile`, request).pipe(map(this.extractData));
    }
}
