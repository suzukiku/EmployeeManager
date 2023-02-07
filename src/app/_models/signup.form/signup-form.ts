import { Component, Inject, Input, OnInit, ViewChild, } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

@Component({
    selector: 'app-signup-form',
    templateUrl: './signup-form.html',
    styleUrls: ['./signup-form.css']
})
export class Signup {
    signupform: FormGroup;
    username: string;
    password: string;
    email: any;
    ngOnInit() {
        this.signupform = this.formBuilder.group({
            username: [this.username, Validators.required],
            password: [this.password, Validators.required],
            email: [this.email, Validators.required],
        });
    }
    constructor(
        private formBuilder: FormBuilder,
    ){}
}