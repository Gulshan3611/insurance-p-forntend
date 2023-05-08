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
        return this.http.get(`${this.apiUrl}/project?page=` + request.page + '&limit=' + request.limit + '&searchBy=' + request.searchBy, request).pipe(map(this.extractData), catchError((error: HttpErrorResponse) => {
            if (error.status === 401) {
                console.log('Unauthorized Access');
            }
            return throwError(error);
        })
        );
    }
    // add project 
    addProject(request: any): Observable<any> {
        return this.http.post(`${this.apiUrl}/project`, request).pipe(map(this.extractData), catchError((error: HttpErrorResponse) => {
            if (error.status === 401) {
                console.log('Unauthorized Access');
            }
            return throwError(error);
        })
        );
    }
    // delete project 
    deleteProject(request: any): Observable<any> {
        return this.http.delete(`${this.apiUrl}/project/` + request).pipe(map(this.extractData), catchError((error: HttpErrorResponse) => {
            if (error.status === 401) {
                console.log('Unauthorized Access');
            }
            return throwError(error);
        })
        );
    }
    // delete project 
    activateDeactivateProjects(request: any): Observable<any> {
        return this.http.post(`${this.apiUrl}/project/activateDeactivateProjects`, request).pipe(map(this.extractData), catchError((error: HttpErrorResponse) => {
            if (error.status === 401) {
                console.log('Unauthorized Access');
            }
            return throwError(error);
        })
        );
    }

    // get project details
    projectDetails(request: any): Observable<any> {
        return this.http.get(`${this.apiUrl}/project/` + request).pipe(map(this.extractData), catchError((error: HttpErrorResponse) => {
            if (error.status === 401) {
                console.log('Unauthorized Access');
            }
            return throwError(error);
        })
        );
    }

    // update project details
    updateProjectDetails(request: any, id: any): Observable<any> {
        return this.http.patch(`${this.apiUrl}/project/` + id, request).pipe(map(this.extractData), catchError((error: HttpErrorResponse) => {
            if (error.status === 401) {
                console.log('Unauthorized Access');
            }
            return throwError(error);
        })
        );
    }
}
