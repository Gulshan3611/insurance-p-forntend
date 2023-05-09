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
        return this.http.get(`${this.apiUrl}/roles?page=` + request.page + '&limit=' + request.limit + '&searchBy=' +request.searchBy,request).pipe(map(this.extractData));
    }
    // get Role details
    roleDetails(request: any): Observable<any> {
        return this.http.get(`${this.apiUrl}/roles/` + request).pipe(map(this.extractData));
    }
    // update Role details
    updateRoleDetails(request: any, id: any): Observable<any> {
        return this.http.patch(`${this.apiUrl}/roles/` +id, request).pipe(map(this.extractData));
    }
    // add Role 
    addRole(request: any): Observable<any> {
        return this.http.post(`${this.apiUrl}/roles`, request).pipe(map(this.extractData));
    }
    // delete Role 
    deleteRole(request: any): Observable<any> {
        return this.http.delete(`${this.apiUrl}/roles/`+request).pipe(map(this.extractData));
    }
    // active deactive Role 
    activateDeactivateRoles(request: any): Observable<any> {
        return this.http.post(`${this.apiUrl}/roles/activateDeactivateRoles`,request).pipe(map(this.extractData));
    }

}
