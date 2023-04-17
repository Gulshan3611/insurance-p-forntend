import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError, tap, retry } from 'rxjs/operators';
import { environment } from '../../environments/environment';


@Injectable()

export class StaffService {

    constructor(private http: HttpClient) { }

    apiUrl: any = environment.apiUrl;
    IsSideBarShow: boolean = true;

    extractData(res: any) {
        const body = res;
        return body || {};
    }

    // get staf Lists
    getStaffLists(request: any): Observable<any> {
        return this.http.get(`${this.apiUrl}/auth/subadmin?page=1&sortBy=asc&limit=10&searchBy=` + request.searchBy, request).pipe(map(this.extractData));
    }
    // active deactive Role 
    activateDeactivateStaff(request: any): Observable<any> {
        return this.http.post(`${this.apiUrl}/auth/activateDeactivateAdmins`, request).pipe(map(this.extractData));
    }
    // delete staff 
    deleteStaff(request: any): Observable<any> {
        return this.http.delete(`${this.apiUrl}/auth/subadmin/` + request).pipe(map(this.extractData));
    }

    // get staff details
    staffDetails(request: any): Observable<any> {
        return this.http.get(`${this.apiUrl}/auth/subadmin/` + request).pipe(map(this.extractData));
    }

    // add staff 
    addNewStaff(request: any): Observable<any> {
        return this.http.post(`${this.apiUrl}/auth/subadmin`, request).pipe(map(this.extractData));
    }

    // update staff details
    updateStaffDetails(request: any, id: any): Observable<any> {
        return this.http.patch(`${this.apiUrl}/auth/subadmin/` +id, request).pipe(map(this.extractData));
    }
}
