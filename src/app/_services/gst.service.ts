import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError, tap, retry } from 'rxjs/operators';
import { environment } from '../../environments/environment';


@Injectable()

export class GstService {

    constructor(private http: HttpClient) { }

    apiUrl: any = environment.apiUrl;
    IsSideBarShow: boolean = true;

    extractData(res: any) {
        const body = res;
        return body || {};
    }

    // get gst Lists
    getGstList(request: any): Observable<any> {
        return this.http.get(`${this.apiUrl}/gst?page=` + request.page + '&limit=' + request.limit + '&searchBy=' + request.searchBy, request)
            .pipe(map(this.extractData), catchError((error: HttpErrorResponse) => {
                if (error.status === 401) {
                    console.log('Unauthorized Access');
                }
                return throwError(error);
            })
        );
    }
    // add gst 
    addGst(request: any): Observable<any> {
        return this.http.post(`${this.apiUrl}/gst`, request).pipe(map(this.extractData));
    }
    // delete gst 
    deleteGst(request: any): Observable<any> {
        return this.http.delete(`${this.apiUrl}/gst/` + request).pipe(map(this.extractData));
    }
    // delete gst 
    activateDeactivateGst(request: any): Observable<any> {
        return this.http.post(`${this.apiUrl}/gst/activateDeactivateGsts`, request).pipe(map(this.extractData));
    }

    // get gst details
    gstDetails(request: any): Observable<any> {
        return this.http.get(`${this.apiUrl}/gst/` + request).pipe(map(this.extractData));
    }

    // update gst details
    updateGstDetails(request: any, id: any): Observable<any> {
        return this.http.patch(`${this.apiUrl}/gst/` + id, request).pipe(map(this.extractData));
    }
}
