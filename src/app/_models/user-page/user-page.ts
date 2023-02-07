import { AfterViewInit, Component, Inject, OnInit, ViewChild,} from '@angular/core';
import { MatTableDataSource } from "@angular/material/table";
import { Employee, TimeManager } from "../api-models";
import { LegendPosition, NgxChartsModule, ScaleType } from '@swimlane/ngx-charts';
import { CdTimerComponent } from 'angular-cd-timer';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LocalStorageService } from 'src/app/local-storage.service';
import { SharedService } from 'src/app/shared.services';
import { FileNameDialogComponentActions } from '../popup-dialog-actions/popup-dialog.component';
import { Input,} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { WorkHours } from '../api-models';
import { UniqueSelectionDispatcher } from '@angular/cdk/collections';

@Component({
    selector: 'user-page',
    templateUrl: './user-page.html',
    styleUrls: ['./user-page.css']
})
export class UserPage {
    @ViewChild('worktimer') worktimer: CdTimerComponent;
    @ViewChild('breaktimer') breaktimer: CdTimerComponent;
    dataSource: MatTableDataSource<TimeManager>;
    columnsToDisplay: string [] = ['TimeStamp', 'WorkHours', 'BreakTime'];
    isnew: boolean = false;
    form: FormGroup;
    stores: any;
    break: boolean;
    first: boolean = false;
    firstcheckin: boolean = false;
    workcalctime: number = 0;
    breakcalctime: number = 0;
    firstworktime: number;
    checkintime: number;
    breakstarttime: number;
    constructor(
        private service: SharedService,
        private formBuilder: FormBuilder,
        private localStorage: LocalStorageService,
        private snackBar: MatSnackBar,
        public employee: Employee

    ) 
    {
        
    }
    ngOnInit() {

        if (!this.employee) {
            this.employee = new Employee();
            this.isnew = true;
        }

        this.form = this.formBuilder.group({
            name: [this.employee.firstName + ' ' + this.employee.lastName],
            email: [this.employee.email],
            workHours: [],
            breakTime: []
        });

        for (const field in this.form.controls) {
            const control = this.form.get(field);
            control?.disable();
        }

        if (!this.isnew) {
            this.localStorage.popupClosedTimeStorage.get(this.employee.employeeID ?? "", 0).subscribe((popupClosedTime) => {
                this.localStorage.breakTimeStoppedStorage.get(this.employee.employeeID ?? "", false).subscribe((breakTimeActive) => {
                    this.break = breakTimeActive;
                    this.localStorage.breakTimeStorage.get(this.employee.employeeID ?? "", 0).subscribe((breakTimeN) => {
                        if (breakTimeN == 0) {
                            this.breakcalctime = 0;
                        } else {
                            if(this.break == true) {
                                const now = new Date();
                                this.breakcalctime = ((now.getHours().valueOf() * 60 * 60 + now.getMinutes().valueOf() * 60 + now.getSeconds().valueOf()) - popupClosedTime) + breakTimeN;
                            } else {
                                this.breakcalctime = breakTimeN;
                            }
                        }

                        if (this.break) {
                            setTimeout(() => {
                                this.breaktimer.start();
                            }, 100); 
                        } else {
                            setTimeout(() => {
                                this.breaktimer.start();
                                setTimeout(() => { 
                                    this.breaktimer.stop();
                                }, 100); 
                            }, 100); 
                        }

                        this.localStorage.checkInTimeStorage.get(this.employee.employeeID ?? "", 0).subscribe((checkInTimeN) => {
                            if (checkInTimeN == 0) {
                                this.workcalctime = 0;
                            } else {
                                if(this.break == false) {
                                    const now = new Date();
                                    this.workcalctime = ((now.getHours().valueOf() * 60 * 60 + now.getMinutes().valueOf() * 60 + now.getSeconds().valueOf()) - popupClosedTime) + checkInTimeN;
                                } else {
                                    this.workcalctime = checkInTimeN;
                                }
                            }
    
                            if (!this.break && checkInTimeN != 0) {
                                setTimeout(() => {
                                    this.worktimer.start();
                                }, 100); 
                            } else {
                                setTimeout(() => {
                                    this.worktimer.start();
                                    setTimeout(() => { 
                                        this.worktimer.stop();
                                    }, 100); 
                                }, 100); 
                            }

                            if (checkInTimeN != 0) {
                                this.firstcheckin = true;
                            }
                        });
                    });
                });
            });

            this.loadTimeHistory();

        }
        

    }
    ngOnDestroy() {
        if (this.breaktimer.get().seconds !== undefined) {
            var secCount = (this.breaktimer.get().hours ?? 0) * 60 * 60 + (this.breaktimer.get().minutes ?? 0) * 60 + this.breaktimer.get().seconds;
            this.localStorage.breakTimeStorage.set(this.employee.employeeID ?? "", secCount);
        }
        if (this.worktimer.get().seconds !== undefined) {
            var secCount = (this.worktimer.get().hours ?? 0) * 60 * 60 + (this.worktimer.get().minutes ?? 0) * 60 + this.worktimer.get().seconds;
            this.localStorage.checkInTimeStorage.set(this.employee.employeeID ?? "", secCount);
        }
        this.localStorage.breakTimeStoppedStorage.set(this.employee.employeeID ?? "", this.break);
        var now = new Date();
        var popupClosedTime = now.getHours().valueOf() * 60 * 60 + now.getMinutes().valueOf() * 60 + now.getSeconds().valueOf();
        this.localStorage.popupClosedTimeStorage.set(this.employee.employeeID ?? "", popupClosedTime);
    }
    loadTimeHistory() {
        this.service.getTimeManagerByEmployeeId(this.employee.employeeID ?? "").subscribe(response => {
          this.dataSource = new MatTableDataSource(response);
        });
      }

    checkin() {
        if(this.firstcheckin == true)
        {
            this.worktimer.reset();
            const now = new Date();
            this.workcalctime = (now.getHours().valueOf() * 60 * 60 + now.getMinutes().valueOf() * 60 + now.getSeconds().valueOf()) - this.firstworktime.valueOf();
            setTimeout(() => {
                this.worktimer.start();
            }, 100);

        }
        else{
            this.worktimer.start();
            this.firstcheckin = true;
            const now= new Date();
            this.firstworktime= (now.getHours().valueOf() * 60 * 60 + now.getMinutes().valueOf() * 60 + now.getSeconds().valueOf());
            this.snackBar.open('Checked in!', 'Close',{
                duration: 2500
            });        }
        const now = new Date();
        this.checkintime = (now.getHours().valueOf() * 60 * 60 + now.getMinutes().valueOf() * 60 + now.getSeconds().valueOf());
    }
    checkout() {
        if(confirm("Are you sure you want to check out?"))
        {
            this.breaktimer.stop();
            this.worktimer.stop();
            this.firstcheckin = !this.firstcheckin;
            const time = new TimeManager();
            time.timemanagerID = null;
            time.breakTime = this.convertTimerToString(this.breaktimer);
            time.workHours = this.convertTimerToString(this.worktimer);
            time.employeeId = this.employee.employeeID ?? "";
            this.service.postTimeManager(time).subscribe(response => {
                console.log('done');
                this.loadTimeHistory();
                this.breakcalctime = 0;
                this.workcalctime = 0;
                this.breaktimer.reset();
                this.worktimer.reset();
                setTimeout(() => {
                    this.worktimer.start();
                    this.breaktimer.start();
                    setTimeout(() => {
                        this.worktimer.stop();
                        this.breaktimer.stop();
                    }, 100); 
                }, 100); 
            });
            this.localStorage.breakTimeStorage.set(this.employee.employeeID ?? "", 0);
            this.localStorage.checkInTimeStorage.set(this.employee.employeeID ?? "", 0);
            this.localStorage.breakTimeStoppedStorage.set(this.employee.employeeID ?? "", false);
            this.localStorage.popupClosedTimeStorage.set(this.employee.employeeID ?? "", 0);
        }
    }

    convertTimerToString(timer: CdTimerComponent): string {
        if (!timer.get().seconds) {
            return 'N/A';
        }
        var timerS = '';
        timerS += timer.get().hours + 'h ';
        timerS += timer.get().minutes + 'm ';
        timerS += timer.get().seconds + 's ';
        return timerS;
    }

    breaktime() {
        if(this.first == false && !this.break)
            {
                this.worktimer.stop();
                this.break = true;
                this.breaktimer.start();
                const now = new Date();
                this.breakstarttime = (now.getHours().valueOf() * 60 * 60 + now.getMinutes().valueOf() * 60 + now.getSeconds().valueOf());
                this.snackBar.open('Break Time!', 'Close',{
                    duration: 2500
                });
                this.first = true;

            }
        else if(this.break == true)
        {
            this.breaktimer.stop();
            this.worktimer.resume();
            this.break = false;
            this.snackBar.open('Break time over!', 'Close',{
                duration: 2500
            });
        }
        else
        {
            this.worktimer.stop();
            this.break = true;
            this.breaktimer.resume();
            const now = new Date();
            this.breakstarttime = (now.getHours().valueOf() * 60 * 60 + now.getMinutes().valueOf() * 60 + now.getSeconds().valueOf());
            this.snackBar.open('Break Time!', 'Close',{
                duration: 2500
            });
        }
    }
    monthlyReport() {
        this.snackBar.open('Monthly report created!', 'Close',{
            duration: 2500
        });
    }
}