import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError, tap, retry } from 'rxjs/operators';
import { environment } from '../../environments/environment';


@Injectable()

export class ResourceService {

    constructor(private http: HttpClient) { }

    apiUrl: any = environment.apiUrl;
    IsSideBarShow: boolean = true;

    extractData(res: any) {
        const body = res;
        return body || {};
    }
    // get Resource Lists
    getResourceLists(request: any): Observable<any> {
        return this.http.get(`${this.apiUrl}/resource?page=1&sortBy=asc&limit=10&searchBy=`+request.searchBy,request).pipe(map(this.extractData));
    }
    // get Resource details
    resourceDetails(request: any): Observable<any> {
        return this.http.get(`${this.apiUrl}/resource/` + request).pipe(map(this.extractData));
    }
    
    // update Resource details
    updateResourceDetails(request: any, id: any): Observable<any> {
        return this.http.patch(`${this.apiUrl}/resource/` +id, request).pipe(map(this.extractData));
    }
    // add Resource 
    addResource(request: any): Observable<any> {
        return this.http.post(`${this.apiUrl}/resource`, request).pipe(map(this.extractData));
    }
    // delete Resource 
    deleteResource(request: any): Observable<any> {
        return this.http.delete(`${this.apiUrl}/resource/`+request).pipe(map(this.extractData));
    }
    // active deactive Resource 
    activateDeactivateResources(request: any): Observable<any> {
        return this.http.post(`${this.apiUrl}/resource/activateDeactivateResources`,request).pipe(map(this.extractData));
    }

}
