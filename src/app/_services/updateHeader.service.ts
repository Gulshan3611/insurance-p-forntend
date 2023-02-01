import { Injectable, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
// import { EventEmitter } from 'protractor';

@Injectable({
    providedIn: 'root'
})
export class updateHeaderService {
    $isCalledService = new EventEmitter()

    checkFunction(isCall: any) {
        this.$isCalledService.emit(isCall)
    }
}