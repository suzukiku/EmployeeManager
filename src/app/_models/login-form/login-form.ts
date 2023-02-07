import { Component, Inject, Input, OnInit, ViewChild, } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';


@Component({
    selector: 'app-login-form',
    templateUrl: './login-form.html',
    styleUrls: ['./login-form.css']
})
export class LoginForm {
    loginform: FormGroup;
    username: string;
    password: string;
    ngOnInit() {
        this.loginform = this.formBuilder.group({
            username: [this.username, Validators.required],
            password: [this.password, Validators.required],
        });
    }
    constructor(
        private formBuilder: FormBuilder,
    ){}
}