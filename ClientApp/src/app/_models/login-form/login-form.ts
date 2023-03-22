import { Component, Inject, Input, OnInit, ViewChild, } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { LoginModel } from 'src/app/request-base';
import { SharedService } from 'src/app/shared.services';
import { LocalStorageService } from 'src/app/local-storage.service';
import { LoginResponse, RegisterModel } from 'src/app/response-base';
import { Router } from '@angular/router';
import { Employee, Token } from '../api-models' ;


@Component({
    selector: 'app-login-form',
    templateUrl: './login-form.html',
    styleUrls: ['./login-form.css']
})
export class LoginForm {
    constructor(
        private formBuilder: FormBuilder,
        private service: SharedService,
        private localStorage: LocalStorageService,
        private router: Router
    ){
        this.loginForm = this.formBuilder.group({
        username: ['', Validators.required],
        password: ['', Validators.required]
      });
    }
    loginForm: FormGroup;
    username: string;
    password: string;
    registerForm: FormGroup;
    email: any;
    loggedIn: boolean = false;

    localUser = {
        isLoggedIn : false,
        username : "Not connected",
      }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: [this.username, Validators.required],
            password: [this.password, Validators.required],
        });
    }
    login() {
        this.loginForm.markAllAsTouched();
      if (!this.loginForm.valid) {
        this.service.openSnackBar("ERROR: Please fix the issues before pressing the button", "OK");
        return;
      }
      var loginModel = new LoginModel();
      for (const field in this.loginForm.controls) {
        const control = this.loginForm.get(field); 
        switch(field) {
          case "username":
            loginModel.UserName = control?.value;
            break;
          case "password":
            loginModel.Password = control?.value;
            break;
        }
      }
      this.service.login(loginModel).subscribe(response => {
        var user = response?.body!.user;
        this.service.user = user;
        this.service.openSnackBar("Successfully logged in from DB!", "Close")


        if (response.body?.token == null) {
          return;
        }
        
        if(user?.isAdmin == false)
        {
          this.router.navigate(['/','user-page']);
        }
        else
        {
          this.router.navigate(['/','admin-page']);
        }
        
        var responseBody = response?.body;
        this.service.authToken = responseBody.token.tokenType + ' ' + responseBody.token.accessToken;
        this.localStorage.tokenStorage.set(this.service.authToken);

        if (!user) {
          this.service.openSnackBar("ERROR: User not registered / Username or Password invalid", "Close");
        }
        else {
          if (!user.email)
            this.service.openSnackBar("ERROR: User not registered / Username or Password invalid", "Close");
          else {
            this.service.openSnackBar("Successfully logged in !", "Close")
            this.service.user = user;
            this.loggedIn = true;
            this.service.isLoggedIn = true;
            this.localUser = {
              isLoggedIn : true,
              username : user.userName,
            }
          }
        }});
    }
}