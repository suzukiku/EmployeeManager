import { Component, Inject, Input, OnInit, ViewChild, } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { LoginModel } from 'src/app/request-base';
import { SharedService } from 'src/app/shared.services';


@Component({
    selector: 'app-login-form',
    templateUrl: './login-form.html',
    styleUrls: ['./login-form.css']
})
export class LoginForm {
    constructor(
        private formBuilder: FormBuilder,
        private service: SharedService,
    ){}
    loginform: FormGroup;
    username: string;
    password: string;
    ngOnInit() {
        this.loginform = this.formBuilder.group({
            username: [this.username, Validators.required],
            password: [this.password, Validators.required],
        });
    }
    login() {
        
    }
}