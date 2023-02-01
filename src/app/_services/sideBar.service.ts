import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError, tap, retry } from 'rxjs/operators';
import { environment } from '../../environments/environment';


@Injectable()

export class SidebarService {

    constructor(private http: HttpClient) { }

    IsSideBarShow: boolean = true;

}
