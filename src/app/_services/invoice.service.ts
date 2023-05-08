import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError, tap, retry } from 'rxjs/operators';
import { environment } from '../../environments/environment';


@Injectable()

export class InvoiceService {

    constructor(private http: HttpClient) { }

    apiUrl: any = environment.apiUrl;
    IsSideBarShow: boolean = true;

    extractData(res: any) {
        const body = res;
        return body || {};
    }

    // get Project Lists
    getProjectLists(request: any): Observable<any> {
        return this.http.get(`${this.apiUrl}/project?vendorId=` + request.vendorId, request).pipe(map(this.extractData), catchError((error: HttpErrorResponse) => {
            if (error.status === 401) {
                console.log('Unauthorized Access');
            }
            return throwError(error);
        })
        );
    }

    getProjectDetail(request: any): Observable<any> {
        return this.http.get(`${this.apiUrl}/project/` + request, request).pipe(map(this.extractData), catchError((error: HttpErrorResponse) => {
            if (error.status === 401) {
                console.log('Unauthorized Access');
            }
            return throwError(error);
        })
        );
    }
    
    // get Role Lists
    getVendorLists(): Observable<any> {
        return this.http.get(`${this.apiUrl}/vendor`).pipe(map(this.extractData), catchError((error: HttpErrorResponse) => {
            if (error.status === 401) {
                console.log('Unauthorized Access');
            }
            return throwError(error);
        })
        );
    }

    // get Invoice Lists
    getInvoiceList(request: any): Observable<any> {
        return this.http.get(`${this.apiUrl}/invoice?page=` + request.page + '&limit=' + request.limit + '&searchBy=' + request.searchBy, request).pipe(map(this.extractData), catchError((error: HttpErrorResponse) => {
            if (error.status === 401) {
                console.log('Unauthorized Access');
            }
            return throwError(error);
        })
        );
    }
    // add Invoice 
    addInvoice(request: any): Observable<any> {
        return this.http.post(`${this.apiUrl}/invoice`, request).pipe(map(this.extractData), catchError((error: HttpErrorResponse) => {
            if (error.status === 401) {
                console.log('Unauthorized Access');
            }
            return throwError(error);
        })
        );
    }
    // delete Invoice 
    deleteInvoice(request: any): Observable<any> {
        return this.http.delete(`${this.apiUrl}/invoice/` + request).pipe(map(this.extractData), catchError((error: HttpErrorResponse) => {
            if (error.status === 401) {
                console.log('Unauthorized Access');
            }
            return throwError(error);
        })
        );
    } 

    // get Invoice details
    invoiceDetails(request: any): Observable<any> {
        return this.http.get(`${this.apiUrl}/invoice/` + request).pipe(map(this.extractData), catchError((error: HttpErrorResponse) => {
            if (error.status === 401) {
                console.log('Unauthorized Access');
            }
            return throwError(error);
        })
        );
    }

    // update Invoice details
    updateInvoiceDetails(request: any, id: any): Observable<any> {
        return this.http.patch(`${this.apiUrl}/invoice/` + id, request).pipe(map(this.extractData), catchError((error: HttpErrorResponse) => {
            if (error.status === 401) {
                console.log('Unauthorized Access');
            }
            return throwError(error);
        })
        );
    }
}
