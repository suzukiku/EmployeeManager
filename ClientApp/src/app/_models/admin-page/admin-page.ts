import { AfterViewInit, Component, OnInit, ViewChild,} from '@angular/core';
import { MatTableDataSource } from "@angular/material/table";
import { Employee, TimeManager } from "../api-models";
import { LegendPosition, NgxChartsModule, ScaleType } from '@swimlane/ngx-charts';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { DialogConfig } from '@angular/cdk/dialog';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { SharedService } from '../../shared.services';
import { FileNameDialogComponent } from '../../_models/popup-dialog/popup-dialog.component';
import { FileNameDialogComponentActions } from '../../_models/popup-dialog-actions/popup-dialog.component';
import {MatSort, Sort} from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { last, merge, tap } from 'rxjs';
import {MatSortModule} from '@angular/material/sort';
import {MatButtonModule} from '@angular/material/button';
import { LocalStorageService } from 'src/app/local-storage.service';


@Component({
    selector: 'admin-page',
    templateUrl: './admin-page.html',
    styleUrls: ['./admin-page.css']
})
export class AdminPage {
    dataSource: MatTableDataSource<Employee>;
  sortedData: MatTableDataSource<Employee>;

  constructor(private service: SharedService ,private dialog: MatDialog,private localStorage: LocalStorageService) {
    
    this.dataSource = new MatTableDataSource<Employee>([]);
    this.sortedData = this.dataSource;
  }
  columnsToDisplay: string[] = ['firstName', 'lastName', 'email', 'button'];
  columnsToDisplayExpand = [...this.columnsToDisplay, 'expand'];
  expandedEmployee: Employee | null;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  ngOnInit() {
    this.loadEmployee();
    this.localStorage.tokenStorage.get('').subscribe(token => {
            this.service.authToken = token;
    this.service.checkToken().subscribe(response => {
                if (response.status !== 200) {
                    return;
                }
                this.service.user = response.body;
    })
  });
  
  }
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  delete(Employee: Employee) {
    if(confirm("Are you sure you want to delete this employee?"))
      this.service.deleteEmployee(Employee.employeeID).subscribe(response => {
        console.log(response.message);
        this.loadEmployee();
    });

  }

  loadEmployee() {
    this.service.getEmployee().subscribe(response => {
      this.dataSource = new MatTableDataSource(<Array<Employee>>response.body);
      console.log(this.dataSource);
      this.dataSource.paginator = this.paginator;
    });
  }

  openAddFileDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "50vw";
    const fileNameDialogRef = this.dialog.open(FileNameDialogComponent,dialogConfig).afterClosed().subscribe(formData => {
      this.service.getEmployee().subscribe(response => {
        this.dataSource = new MatTableDataSource(<Array<Employee>>response.body);
        this.dataSource.paginator = this.paginator;
      });
    });
  }

  edit(employee: Employee) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "50vw";
    dialogConfig.data = employee;
    const fileNameDialogRef = this.dialog.open(FileNameDialogComponent,dialogConfig).afterClosed().subscribe(formData => {
      this.service.getEmployee().subscribe(response => {
        this.dataSource = new MatTableDataSource(<Array<Employee>>response.body);
        this.dataSource.paginator = this.paginator;
      });
    });   
  }

  openActionsFileDialog(employee: Employee) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "50vw";
    dialogConfig.data = employee;
    const fileNameDialogRef = this.dialog.open(FileNameDialogComponentActions,dialogConfig).afterClosed().subscribe(formData => {
      this.service.getEmployee().subscribe(response => {
        this.dataSource = new MatTableDataSource(<Array<Employee>>response.body);
        this.dataSource.paginator = this.paginator;
      });
    });
  }

  sortData(sort:Sort){
    const data = this.dataSource.data.slice();
    if (!sort.active || sort.direction === '') {
      this.dataSource.data = data;
      return;
    }
    this.dataSource.data = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'firstName':
          return compare(a.firstName, b.firstName, isAsc);
        case 'lastName':
          return compare(a.lastName, b.lastName, isAsc);
        case 'email':
          return compare(a.email, b.email, isAsc);
          default:
            return 0;
      }
    });
  }
}
  function compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
