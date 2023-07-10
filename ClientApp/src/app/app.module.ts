import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import { AppComponent } from './app.component';
import { MatTableModule } from '@angular/material/table';
import {MatPaginatorIntl, MatPaginatorModule} from '@angular/material/paginator';
import {MatFormFieldModule, MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MatFormFieldControl } from '@angular/material/form-field';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { SharedService } from './shared.services';
import {MatDialogModule} from '@angular/material/dialog';
import { FileNameDialogComponent } from './_models/popup-dialog/popup-dialog.component';
import {MatTabsModule} from '@angular/material/tabs';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import { FileNameDialogComponentActions } from './_models/popup-dialog-actions/popup-dialog.component';
import {MatSortModule} from '@angular/material/sort';
import { CdTimerModule } from 'angular-cd-timer';
import { AsyncPipe, CommonModule, NgFor } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import { NgxChartsModule, PieChartComponent } from '@swimlane/ngx-charts';
import { ChartsComponent } from './_models/ngx-chart/ngx-chart-component';
import { AppRoutingModule } from './app-routing.module';
import { UserPage } from './_models/user-page/user-page';
import { AdminPage } from './_models/admin-page/admin-page';
import { NeoPopupClosedStorage } from './local-storage.service';
import { Employee, Projects } from './_models/api-models';
import { AuthPage } from './_models/auth-page/auth-page';
import { LoginForm } from './_models/login-form/login-form';
import { Signup } from './_models/signup.form/signup-form';
import { FileUploadModule } from 'ng2-file-upload';
import { FileuploaderComponent } from './_models/fileuploader/fileuploader.component';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ProjectsPage, ProjectsPagePopupDialog } from './_models/projects-page/projects-page';

import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Component, ElementRef, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent,} from '@angular/material/autocomplete';
import {MatChipInputEvent,} from '@angular/material/chips';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@NgModule({
  declarations: [
    AppComponent,
    FileNameDialogComponent,
    FileNameDialogComponentActions,
    ChartsComponent,
    UserPage,
    AdminPage,
    AuthPage,
    LoginForm,
    Signup,
    FileuploaderComponent,
    ProjectsPage,
    ProjectsPagePopupDialog,
    
    
    
  ],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatIconModule,
    MatTabsModule,
    ReactiveFormsModule,
    MatSelectModule,
    CdTimerModule,
    MatSortModule,
    CommonModule,
    MatSnackBarModule,
    MatButtonModule,
    BrowserModule, 
    FormsModule,
    NgxChartsModule,
    AppRoutingModule,
    RouterModule,
    BrowserModule,
    FormsModule,
    FileUploadModule,
    MatChipsModule,
    NgFor,
    MatAutocompleteModule,
    AsyncPipe,
    
  ],
  providers: [
    Employee,
    SharedService,
    PieChartComponent,
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'fill'}}
  ],

  
})

export class AppModule { 
    
}
