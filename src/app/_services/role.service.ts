import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError, tap, retry } from 'rxjs/operators';
import { environment } from '../../environments/environment';


@Injectable()

export class RoleService {

    constructor(private http: HttpClient) { }

    apiUrl: any = environment.apiUrl;
    IsSideBarShow: boolean = true;

    extractData(res: any) {
        const body = res;
        return body || {};
    }
    // get Role Lists
    getRoleLists(request: any): Observable<any> {
        return this.http.get(`${this.apiUrl}/roles?page=` + request.page + '&limit=' + request.limit + '&searchBy=' +request.searchBy,request).pipe(map(this.extractData), catchError((error: HttpErrorResponse) => {
            if (error.status === 401) {
                console.log('Unauthorized Access');
            }
            return throwError(error);
        })
        );
    }
    // get Role details
    roleDetails(request: any): Observable<any> {
        return this.http.get(`${this.apiUrl}/roles/` + request).pipe(map(this.extractData), catchError((error: HttpErrorResponse) => {
            if (error.status === 401) {
                console.log('Unauthorized Access');
            }
            return throwError(error);
        })
        );
    }
    // update Role details
    updateRoleDetails(request: any, id: any): Observable<any> {
        return this.http.patch(`${this.apiUrl}/roles/` +id, request).pipe(map(this.extractData), catchError((error: HttpErrorResponse) => {
            if (error.status === 401) {
                console.log('Unauthorized Access');
            }
            return throwError(error);
        })
        );
    }
    // add Role 
    addRole(request: any): Observable<any> {
        return this.http.post(`${this.apiUrl}/roles`, request).pipe(map(this.extractData), catchError((error: HttpErrorResponse) => {
            if (error.status === 401) {
                console.log('Unauthorized Access');
            }
            return throwError(error);
        })
        );
    }
    // delete Role 
    deleteRole(request: any): Observable<any> {
        return this.http.delete(`${this.apiUrl}/roles/`+request).pipe(map(this.extractData), catchError((error: HttpErrorResponse) => {
            if (error.status === 401) {
                console.log('Unauthorized Access');
            }
            return throwError(error);
        })
        );
    }
    // active deactive Role 
    activateDeactivateRoles(request: any): Observable<any> {
        return this.http.post(`${this.apiUrl}/roles/activateDeactivateRoles`,request).pipe(map(this.extractData), catchError((error: HttpErrorResponse) => {
            if (error.status === 401) {
                console.log('Unauthorized Access');
            }
            return throwError(error);
        })
        );
    }

}
