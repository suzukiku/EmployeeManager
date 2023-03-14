import { Component, Inject, Input, OnInit, ViewChild, } from '@angular/core'; 
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { LocalStorageService } from 'src/app/local-storage.service';
import { LoginModel } from 'src/app/request-base';
import { RegisterModel } from 'src/app/response-base';
import { SharedService } from 'src/app/shared.services';
import { Router } from '@angular/router';

@Component({
    selector: 'app-signup-form',
    templateUrl: './signup-form.html',
    styleUrls: ['./signup-form.css']
})
export class Signup {
    constructor(
        private formBuilder: FormBuilder,
        private service: SharedService,
        private localStorage: LocalStorageService,
        private router: Router,
    ) {
      this.loginForm = this.formBuilder.group({
        username: ['', Validators.required],
        password: ['', Validators.required]
      });
      this.registerForm = this.formBuilder.group({
        email: ['', [Validators.email, Validators.required]],
        username: ['', Validators.required],
        password: ['', Validators.required],
        confirmPass: ['', Validators.required]
      });
    }
    registerForm: FormGroup;
    loginForm: FormGroup;
    username: string;
    password: string;
    email: any;
    loggedIn: boolean = false;

    localUser = {
      isLoggedIn : false,
      username : "Not connected",
    }
    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            username: [this.username, Validators.required],
            password: [this.password, Validators.required],
            email: [this.email, Validators.required],
        });
    }
    register() {
        var registerRequest = new RegisterModel();
      for (const field in this.registerForm.controls) {
        const control = this.registerForm.get(field); 
        switch(field) {
          case "email":
            registerRequest.Email = control?.value;
            break;
          case "username":
            registerRequest.UserName = control?.value;
            break;
          case "password":
            registerRequest.Password = control?.value;
            break;
        }
      }
      this.service.register(registerRequest).subscribe(response => {
        if (response.status < 200 || response.status > 299) {
          return;
        }
        this.service.openSnackBar("Successfully registered user!", "Close");

        var loginModel = new LoginModel();
        loginModel.UserName = registerRequest.UserName;
        loginModel.Password = registerRequest.Password;
        this.service.login(registerRequest).subscribe(responseLogin => {
          if (responseLogin.status < 200 || responseLogin.status > 299 || responseLogin.body == null) {
            return;
          }
          var token = responseLogin.body.token;
          this.service.authToken = token.tokenType + ' ' + token.accessToken;
          this.localStorage.tokenStorage.set(this.service.authToken);
          var user = responseLogin.body.user;
          if (!user) {
            this.service.openSnackBar("ERROR: User not registered / Username or Password invalid", "Close");
          }
          else {
            if (!user.email)
              this.service.openSnackBar("ERROR: User not registered / Username or Password invalid", "Close");
            else {
              this.service.openSnackBar("Successfully logged in from DB!", "Close")
              this.service.user = user;
              this.loggedIn = true;
              this.service.isLoggedIn = true;
              this.localUser = {
                isLoggedIn : true,
                username : user.userName,
              }
              this.router.navigate(['./user-page']);
            }
          }});
      });
    }
}