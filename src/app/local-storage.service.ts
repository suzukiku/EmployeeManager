import { Injectable } from '@angular/core';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class LocalStorageService {

    constructor(localStorage: LocalStorage) {
        this.breakTimeStoppedStorage = new BreakTimeStoppedStorage(localStorage); 
        this.popupClosedTimeStorage = new NeoPopupClosedStorage(localStorage); 
        this.checkInTimeStorage = new NeoCheckInTimeStorage(localStorage); 
        this.breakTimeStorage = new NeoBreakTimeStorage(localStorage); 
    }
    breakTimeStoppedStorage: BreakTimeStoppedStorage;
    popupClosedTimeStorage: NeoPopupClosedStorage;
    checkInTimeStorage: NeoCheckInTimeStorage;
    breakTimeStorage: NeoBreakTimeStorage;
    
}


export class StorageBase {
    constructor(private localStorage: LocalStorage) { 
    }

    protected write(key: string, value: any){
        this.localStorage.setItem(key, value).subscribe((data) => {

        });
    }

    protected read(key: string, defaultValue?: any){
        var result = this.localStorage.getItem(key).pipe(map( (obsResult) => {
            if(obsResult == undefined || obsResult == null){
                return defaultValue;
            }
            return obsResult;
        } ));
        return result;
    }

}

export class CheckInTimeStorage extends StorageBase{
    constructor(localStorage: LocalStorage) {
        super(localStorage);
    }
    public set = (employeeId:string, checkinTime:string) => {
        if(!checkinTime || !employeeId) {
            return;
        }
        var key = 'checkinTime/' + employeeId;
        this.write(key, checkinTime);
    }
    public get = (employeeId: string, defaultValue?: any): Observable<any> => {
        var key = 'checkinTime/' + employeeId;
        var result = this.read(key, defaultValue);
        return result;
    }
}
export class BreakTimeStorage extends StorageBase {

    constructor(localStorage: LocalStorage) {
            super(localStorage);
    }

    public set = (employeeId: string, breakTime: string) => {

        if(!breakTime || !employeeId) {
          return;
        }

        var key = 'breakTime/' + employeeId;
        this.write(key, breakTime);
    }

    public get = (employeeId: string, defaultValue?: any): Observable<any> => {
        var key = 'breakTime/' + employeeId;
        var result = this.read(key, defaultValue);
        return result;
    }
}
 
export class WorkTimeStorage extends StorageBase {

    constructor(localStorage: LocalStorage) {
            super(localStorage);
    }

    public set = (employeeId: string, checkinTime: string) => {

        if(!employeeId || !checkinTime) {
          return;
        }

        var key = 'checkinTime/' + employeeId;
        this.write(key, checkinTime);
    }

    public get = (employeeId: string, defaultValue?: any): Observable<any> => {
        var key = 'checkinTime/' + employeeId;
        var result = this.read(key, defaultValue);
        return result;
    }
}

export class BreakTimeStoppedStorage extends StorageBase {

    constructor(localStorage: LocalStorage) {
            super(localStorage);
    }

    public set = (employeeId: string, isBreakTimeStopped: boolean) => {

        if(!employeeId) {
          return;
        }

        var key = 'breakTimeActive/' + employeeId;
        this.write(key, isBreakTimeStopped);
    }

    public get = (employeeId: string, defaultValue?: any): Observable<any> => {
        var key = 'breakTimeActive/' + employeeId;
        var result = this.read(key, defaultValue);
        return result;
    }
}

export class NeoBreakTimeStorage extends StorageBase {

    constructor(localStorage: LocalStorage) {
            super(localStorage);
    }

    public set = (employeeId: string, breakTime: number) => {

        if(!employeeId) {
          return;
        }

        var key = 'breakTime/' + employeeId;
        this.write(key, breakTime);
    }

    public get = (employeeId: string, defaultValue?: any): Observable<any> => {
        var key = 'breakTime/' + employeeId;
        var result = this.read(key, defaultValue);
        return result;
    }
}


export class NeoCheckInTimeStorage extends StorageBase {

    constructor(localStorage: LocalStorage) {
            super(localStorage);
    }

    public set = (employeeId: string, checkInTime: number) => {

        if(!employeeId) {
          return;
        }

        var key = 'checkInTimeActive/' + employeeId;
        this.write(key, checkInTime);
    }

    public get = (employeeId: string, defaultValue?: any): Observable<any> => {
        var key = 'checkInTimeActive/' + employeeId;
        var result = this.read(key, defaultValue);
        return result;
    }
}

export class NeoPopupClosedStorage extends StorageBase {

    constructor(localStorage: LocalStorage) {
            super(localStorage);
    }

    public set = (employeeId: string, popupClosedTS: number) => {

        if(!employeeId) {
          return;
        }

        var key = 'popupClosedTime/' + employeeId;
        this.write(key, popupClosedTS);
    }

    public get = (employeeId: string, defaultValue?: any): Observable<any> => {
        var key = 'popupClosedTime/' + employeeId;
        var result = this.read(key, defaultValue);
        return result;
    }
}