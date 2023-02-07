import { Component, Inject, OnInit, } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Employee } from '../api-models';
import { SharedService } from 'src/app/shared.services';
import { MatTableDataSource } from '@angular/material/table';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
    templateUrl: 'popup-dialog.component.html',
    styleUrls: ['popup-dialog.component.css']

})
export class FileNameDialogComponent {
    isnew: boolean;
    form: FormGroup;
    stores: any;

    lastDupeEmail:string;

    constructor(
        private service: SharedService,
        private formBuilder: FormBuilder,
        private dialogRef: MatDialogRef<FileNameDialogComponent>,
        private snackBar: MatSnackBar,
        @Inject(MAT_DIALOG_DATA) public employee: Employee,

    ) { }

    ngOnInit() {

        if (!this.employee) {
            this.employee = new Employee();
            this.isnew = true;
        }

        this.form = this.formBuilder.group({
            firstname: [this.employee.firstName, Validators.required],
            lastname: [this.employee.lastName, Validators.required],
            email: [this.employee.email, [Validators.email]]
        });
    }
    onCloseDialog() {
        this.dialogRef.close();
    }
    submit() {
        if (!this.form.valid) {
            this.snackBar.open('Invalid Input', 'Close',{
                duration: 2500
            });
            return;
        }
        var employee = new Employee();
        employee.employeeID = null;
        for (const field in this.form.controls) {
            const control = this.form.get(field);
            switch (field) {
                case "firstname":
                    if (control?.value == "") {
                        this.snackBar.open('Please enter the first name.', 'Close',{
                            duration: 2500
                        });
                        return;
                    }
                    else {
                        employee.firstName = control?.value;
                        break;
                    }
                case "lastname":
                    if (control?.value == "") {
                        this.snackBar.open('Please enter the last name.', 'Close',{
                            duration: 2500
                        });
                        return;
                    }
                    else {
                        employee.lastName = control?.value;
                        break;
                    }
                case "email":
                    if (control?.value == "") {
                        this.snackBar.open('Please enter the email.', 'Close',{
                            duration: 2500
                        });
                        return;
                    }
                    else {
                        employee.email = control?.value;
                        break;
                    }
            }
        }
        if (this.isnew) {
            this.service.postEmployee(employee).subscribe(response => {
                console.log('done');
                this.dialogRef.close(this.form.value);
            }, error => {
                alert(error.error);
            });
        }
        else {
            employee.employeeID = this.employee.employeeID;
            this.service.putEmployee(employee).subscribe(response => {
                console.log('edited');
                this.dialogRef.close(this.form.value);
            });
        }
    }
}