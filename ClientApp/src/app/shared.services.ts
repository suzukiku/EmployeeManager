import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { Observable, of, throwError, Timestamp } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Employee, GetTimeManagerByEmployeeIdResponse, ResponseBase, TimeManager, User, WorkHours } from './_models/api-models';
import { environment } from 'src/environments/environment';
import { Time } from '@angular/common';
import { LoginModel } from './request-base';
import { LoginResponse, RegisterModel } from './response-base';
import { LocalStorageService } from './local-storage.service';


@Injectable({
    providedIn: 'root'
})

export class SharedService {
    readonly APIUrl = environment.apiUrl;

    isLoggedIn: boolean = false;
    appLoaded: boolean = false;
    authToken: string = '';
    user: any;
    // private router: Router;


    constructor(private http:HttpClient,
        private router: Router,
        private _snackBar: MatSnackBar,
        private localStorage: LocalStorageService
    ) {

    }

    get hasToken(): boolean {
      return !!this.authToken;
    }
    

    get(urlLink: string) {
      return this.http.get(urlLink,
        { headers: new HttpHeaders().set('Authorization', this.authToken), observe: 'response' } )
        .pipe(catchError((errorResponse: HttpErrorResponse) => {
          switch(errorResponse.status) {
            case 400:
              this.openSnackBar('ERROR: ' + errorResponse.error, "Ok");
              break;
            case 401:
              this.openSnackBar('ERROR: Unauthorized!', "Ok");
              // go back to login
              break;
            case 403:
              this.openSnackBar('You naughty, naughty!', "Ok");
              break;
            case 500:
              this.openSnackBar('SERVER ERROR: ' + errorResponse.error, "Ok");
              break;
          }
          return throwError(() => new Error('Error occured'));
      }));
    }

    post(urlLink: string, requestObject: any, suppressErrors?: boolean) {
        return this.http.post(urlLink, requestObject,
          { headers: new HttpHeaders().set('Authorization', this.authToken), observe: 'response' } )
          .pipe(catchError((errorResponse: HttpErrorResponse) => {
            switch(errorResponse.status) {
              case 400:
                this.openSnackBar('ERROR: ' + errorResponse.error, "Ok");
                break;
              case 401:
                  // go back to login
                this.openSnackBar('ERROR: ' + errorResponse.error, "Ok");
                break;
              case 403:
                this.openSnackBar('You naughty, naughty!', "Ok");
                break;
              case 500:
                this.openSnackBar('SERVER ERROR: ' + errorResponse.error, "Ok");
                break;
            }
            return throwError(() => new Error('Error occured'));
        }));
      }

      patch(urlLink: string, requestObject: any, suppressErrors?: boolean) {
        return this.http.patch(urlLink, requestObject,
          { headers: new HttpHeaders().set('Authorization', this.authToken), observe: 'response' } )
          .pipe(catchError((errorResponse: HttpErrorResponse) => {
            switch(errorResponse.status) {
              case 400:
                this.openSnackBar('ERROR: ' + errorResponse.error, "Ok");
                break;
              case 401:
                 // go back to login
                this.openSnackBar('ERROR: Unauthorized!', "Ok");
                break;
              case 403:
                this.openSnackBar('You naughty, naughty!', "Ok");
                break;
              case 500:
                this.openSnackBar('SERVER ERROR: ' + errorResponse.error, "Ok");
                break;
            }
            return throwError(() => new Error('Error occured'));
        }));
      }

      put(urlLink: string, requestObject: any) {
        return this.http.put(urlLink, requestObject,
          { headers: new HttpHeaders().set('Authorization', this.authToken), observe: 'response' } )
          .pipe(catchError((errorResponse: HttpErrorResponse) => {
            switch(errorResponse.status) {
              case 400:
                this.openSnackBar('ERROR: ' + errorResponse.error, "Ok");
                break;
              case 401:
                 // go back to login
                this.openSnackBar('ERROR: Unauthorized!', "Ok");
                break;
              case 403:
                this.openSnackBar('You naughty, naughty!', "Ok");
                break;
              case 500:
                this.openSnackBar('SERVER ERROR: ' + errorResponse.error, "Ok");
                break;
            }
            return throwError(() => new Error('Error occured'));
        }));
      }

      delete(urlLink: string) {
        return this.http.delete(urlLink,
          { headers: new HttpHeaders().set('Authorization', this.authToken), observe: 'response' } )
          .pipe(catchError((errorResponse: HttpErrorResponse) => {
            switch(errorResponse.status) {
              case 400:
                this.openSnackBar('ERROR: ' + errorResponse.error, "Ok");
                break;
              case 401:
                this.openSnackBar('ERROR: Unauthorized!', "Ok");
                break;
              case 403:
                this.openSnackBar('You naughty, naughty!', "Ok");
                break;
              case 500:
                this.openSnackBar('SERVER ERROR: ' + errorResponse.error, "Ok");
                break;
            }
            return throwError(() => new Error('Error occured'));
        }));
      }
    

    getEmployee(): Observable<HttpResponse<Employee[]>> {
        return this.get(this.APIUrl + "Employee") as Observable<HttpResponse<Employee[]>>;
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

    getTimeManager(): Observable<HttpResponse<TimeManager[]>> {
        return this.get(this.APIUrl + "TimeManager") as Observable<HttpResponse<TimeManager[]>>;
    }

    getTimeManagerByEmployeeId(employeeId: string): Observable<HttpResponse<GetTimeManagerByEmployeeIdResponse>> {
        return this.get(this.APIUrl + "TimeManager/byEmployee/" + employeeId) as Observable<HttpResponse<GetTimeManagerByEmployeeIdResponse>>;
    }

    postTimeManager(timemanager: TimeManager): Observable<Object> {
        return this.post(this.APIUrl + "TimeManager", timemanager) as Observable<HttpResponse<Object>>;
    }
    postWorkingHours(workinghours: WorkHours): Observable<object> {
        return this.http.post(this.APIUrl + "WorkHours", workinghours) as Observable<Object>;
    }

    login(loginModel: LoginModel) {
        var obs = this.post(this.APIUrl+'login', loginModel) as Observable<HttpResponse<LoginResponse>>;
        return obs;
    }
    
    register(user: RegisterModel) {
        var obs = this.post(this.APIUrl+'register', user) as Observable<HttpResponse<User>>;
        return obs;
    }

    checkToken() {
      var obs = this.post(this.APIUrl+'checkToken', null) as Observable<HttpResponse<User>>;
      return obs;
  }
    
    openSnackBar(message: string, action: string) {
        this._snackBar.open(message, action, {
          duration: 2000,
          verticalPosition: 'top',});
    }
        
}
