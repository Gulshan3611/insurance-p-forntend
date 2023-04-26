import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError, tap, retry } from 'rxjs/operators';
import { environment } from '../../environments/environment';


@Injectable()

export class ProjectService {

    constructor(private http: HttpClient) { }

    apiUrl: any = environment.apiUrl;
    IsSideBarShow: boolean = true;

    extractData(res: any) {
        const body = res;
        return body || {};
    }

    // get Project Lists
    getProjectLists(request: any): Observable<any> {
        return this.http.get(`${this.apiUrl}/project?page=1&sortBy=asc&limit=10&searchBy=` + request.searchBy, request).pipe(map(this.extractData));
    }
    // add project 
    addProject(request: any): Observable<any> {
        return this.http.post(`${this.apiUrl}/project`, request).pipe(map(this.extractData));
    }
    // delete project 
    deleteProject(request: any): Observable<any> {
        return this.http.delete(`${this.apiUrl}/project/` + request).pipe(map(this.extractData));
    }
    // delete project 
    activateDeactivateProjects(request: any): Observable<any> {
        return this.http.post(`${this.apiUrl}/project/activateDeactivateProjects`, request).pipe(map(this.extractData));
    }

    // get project details
    projectDetails(request: any): Observable<any> {
        return this.http.get(`${this.apiUrl}/project/` + request).pipe(map(this.extractData));
    }

    // update project details
    updateProjectDetails(request: any, id: any): Observable<any> {
        return this.http.patch(`${this.apiUrl}/project/` + id, request).pipe(map(this.extractData));
    }
}
