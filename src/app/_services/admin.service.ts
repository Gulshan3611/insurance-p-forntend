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
        return this.http.post(`${this.apiUrl}/auth/login`, request).pipe(map(this.extractData));
    }
    // logOut
    logOut(request: any): Observable<any> {
        return this.http.post(`${this.apiUrl}/auth/logout`, request).pipe(map(this.extractData));
    }
    // update user info
    updateUserInfo(id: any,request: any): Observable<any> {
        return this.http.patch(`${this.apiUrl}/auth/subadmin/profile/`+id, request).pipe(map(this.extractData));
    }

    // forget Password
    forgotPassword(data: any): Observable<any> {
        return this.http.post(`${this.apiUrl}/auth/forgot-password`, data).pipe(map(this.extractData));
    }
    
    // Reset Password
    resetPassword(token:any,body:any){
        return this.http.post(this.apiUrl+'/auth/reset-password?token='+token, body)
    }

    // Change Password
    changePassword(request: any): Observable<any> {
        return this.http.post(`${this.apiUrl}/auth/change-password`, request).pipe(map(this.extractData));
    }

    // update Admin
    updateAdmin(request: any): Observable<any> {
        return this.http.patch(`${this.apiUrl}/admin/auth/editprofile`, request).pipe(map(this.extractData));
    }
    // update Bank Details
    updateBankDetails(request: any): Observable<any> {
        return this.http.post(`${this.apiUrl}/bank`, request).pipe(map(this.extractData));
    }
    // get Bank Details
    getBankDetails(request: any): Observable<any> {
        return this.http.get(`${this.apiUrl}/bank/`+request ).pipe(map(this.extractData));
    }
    
    // update Ofiice Details
    updateOfiiceDetails(request: any): Observable<any> {
        return this.http.post(`${this.apiUrl}/company`,request).pipe(map(this.extractData));
    }
  
}
