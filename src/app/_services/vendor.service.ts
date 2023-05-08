import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError, tap, retry } from 'rxjs/operators';
import { environment } from '../../environments/environment';


@Injectable()

export class VendorService {

    constructor(private http: HttpClient) { }

    apiUrl: any = environment.apiUrl;
    IsSideBarShow: boolean = true;

    extractData(res: any) {
        const body = res;
        return body || {};
    }
    // get Role Lists
    getVendorLists(request: any): Observable<any> {
        return this.http.get(`${this.apiUrl}/vendor?page=` + request.page + '&limit=' + request.limit + '&searchBy=' + request.searchBy, request).pipe(map(this.extractData), catchError((error: HttpErrorResponse) => {
            if (error.status === 401) {
                console.log('Unauthorized Access');
            }
            return throwError(error);
        })
        );
    }
    // add Role 
    addVendor(request: any): Observable<any> {
        return this.http.post(`${this.apiUrl}/vendor`, request).pipe(map(this.extractData), catchError((error: HttpErrorResponse) => {
            if (error.status === 401) {
                console.log('Unauthorized Access');
            }
            return throwError(error);
        })
        );
    }
    // delete Role 
    deleteVendor(request: any): Observable<any> {
        return this.http.delete(`${this.apiUrl}/vendor/` + request).pipe(map(this.extractData), catchError((error: HttpErrorResponse) => {
            if (error.status === 401) {
                console.log('Unauthorized Access');
            }
            return throwError(error);
        })
        );
    }
    // delete Role 
    activateDeactivateVendors(request: any): Observable<any> {
        return this.http.post(`${this.apiUrl}/vendor/activateDeactivateVendors`, request).pipe(map(this.extractData), catchError((error: HttpErrorResponse) => {
            if (error.status === 401) {
                console.log('Unauthorized Access');
            }
            return throwError(error);
        })
        );
    }

    // get vendor details
    vendorDetails(request: any): Observable<any> {
        return this.http.get(`${this.apiUrl}/vendor/` + request).pipe(map(this.extractData), catchError((error: HttpErrorResponse) => {
            if (error.status === 401) {
                console.log('Unauthorized Access');
            }
            return throwError(error);
        })
        );
    }

    // update vendor details
    updateVendorDetails(request: any, id: any): Observable<any> {
        return this.http.patch(`${this.apiUrl}/vendor/` + id, request).pipe(map(this.extractData), catchError((error: HttpErrorResponse) => {
            if (error.status === 401) {
                console.log('Unauthorized Access');
            }
            return throwError(error);
        })
        );
    }

}
