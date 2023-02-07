import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { Observable, of, throwError, Timestamp } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Employee, ResponseBase, TimeManager, WorkHours } from './_models/api-models';
import { environment } from 'src/environments/environment';
import { Time } from '@angular/common';


@Injectable({
    providedIn: 'root'
})

export class SharedService {
    readonly APIUrl = environment.apiUrl;

    isLoggedIn: boolean = false;
    appLoaded: boolean = false;

    constructor(private http:HttpClient,
        // private router: Router,
    ) {

    }


    getEmployee(): Observable<Employee[]> {
        return this.http.get<Employee[]>(this.APIUrl + "Employee");
    }

    postEmployee(employee: Employee): Observable<Object> {
        return this.http.post(this.APIUrl + "Employee", employee) as Observable<Object>;
    }
     
    deleteEmployee(employeeid: string | null): Observable<ResponseBase>  {
        return this.http.delete(this.APIUrl + "Employee/" + employeeid) as Observable<ResponseBase>;
    }

    putEmployee(employee: Employee) {
        return this.http.put(this.APIUrl + "Employee", employee) as Observable<ResponseBase>;
    }

    getTimeManager(): Observable<TimeManager[]> {
        return this.http.get<TimeManager[]>(this.APIUrl + "TimeManager");
    }

    getTimeManagerByEmployeeId(employeeId: string): Observable<TimeManager[]> {
        return this.http.get<TimeManager[]>(this.APIUrl + "TimeManager/byEmployee/" + employeeId);
    }

    postTimeManager(timemanager: TimeManager): Observable<Object> {
        return this.http.post(this.APIUrl + "TimeManager", timemanager) as Observable<Object>;
    }
    postWorkingHours(workinghours: WorkHours): Observable<object> {
        return this.http.post(this.APIUrl + "WorkHours", workinghours) as Observable<Object>;
    }
        
}
