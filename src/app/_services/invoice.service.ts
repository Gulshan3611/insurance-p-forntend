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
        return this.http.get(`${this.apiUrl}/project?vendorId=` + request.vendorId, request).pipe(map(this.extractData));
    }

    getProjectDetail(request: any): Observable<any> {
        return this.http.get(`${this.apiUrl}/project/` + request, request).pipe(map(this.extractData));
    }
    
    // get Role Lists
    getVendorLists(): Observable<any> {
        return this.http.get(`${this.apiUrl}/vendor`).pipe(map(this.extractData));
    }

    // get gst Lists
    getInvoiceList(request: any): Observable<any> {
        return this.http.get(`${this.apiUrl}/invoice?page=1&sortBy=asc&limit=10&searchBy=` + request.searchBy, request).pipe(map(this.extractData));
    }
    // add gst 
    addInvoice(request: any): Observable<any> {
        return this.http.post(`${this.apiUrl}/invoice`, request).pipe(map(this.extractData));
    }
    // delete gst 
    // deleteGst(request: any): Observable<any> {
    //     return this.http.delete(`${this.apiUrl}/gst/` + request).pipe(map(this.extractData));
    // }
    // // delete gst 
    // activateDeactivateGst(request: any): Observable<any> {
    //     return this.http.post(`${this.apiUrl}/gst/activateDeactivateGsts`, request).pipe(map(this.extractData));
    // }

    // // get gst details
    // gstDetails(request: any): Observable<any> {
    //     return this.http.get(`${this.apiUrl}/gst/` + request).pipe(map(this.extractData));
    // }

    // // update gst details
    // updateGstDetails(request: any, id: any): Observable<any> {
    //     return this.http.patch(`${this.apiUrl}/gst/` + id, request).pipe(map(this.extractData));
    // }
}
