import { AfterViewInit, Component, Inject, OnInit, ViewChild,} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from "@angular/material/table";
import { Data } from 'popper.js';
import { DataSource } from '@angular/cdk/collections';
import { FileNameDialogComponent } from '../popup-dialog/popup-dialog.component';
import { FileNameDialogComponentActions } from '../popup-dialog-actions/popup-dialog.component';
import {MatIconModule} from '@angular/material/icon';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

@Component({
    selector: 'projects-page',
    templateUrl: './projects-page.html',
    styleUrls: ['./projects-page.css'],
    animations: [
        trigger('detailExpand', [
          state('collapsed', style({height: '0px', minHeight: '0'})),
          state('expanded', style({height: '*'})),
          transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
        ]),
      ]
})

export class ProjectsPage {
  constructor(public dialog: MatDialog){}
    openAddFileDialog() {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.autoFocus = true;
        dialogConfig.width = "50vw";
        const fileNameDialogRef = this.dialog.open(ProjectsPagePopupDialog,dialogConfig)
      }
    
    dataSource = new MatTableDataSource<Projects>(ELEMENT_DATA);
    columnsToDisplay = ['position', 'name', 'author'];
    columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
    expandedElement: Projects | null;
    @ViewChild(MatPaginator)
    paginator!: MatPaginator;
    ngAfterViewInit() {
      this.dataSource.paginator = this.paginator;
    }
}


export interface Projects {
    name: string;
    position: number;
    author: string;
    description: string;
  }


  @Component({
    selector: 'projects-popup-dialog',
    templateUrl: 'projects-popup-dialog.html',
  })
  export class ProjectsPagePopupDialog {
  
    form: FormGroup;
    projectname: string;
    description: string;
    author: string;


    constructor(public dialogRef: MatDialogRef<ProjectsPagePopupDialog>,private formBuilder: FormBuilder,
      @Inject(MAT_DIALOG_DATA) public data: Projects){}

      ngOnInit() {
        this.form = this.formBuilder.group({
            projectname: [this.projectname, Validators.required],
            description: [this.description, Validators.required],
            author: [this.author, Validators.required],
        });
    }
      
    onCloseDialog() {
        this.dialogRef.close();
    }
    submit() {
      console.log("oke");
    }
  }












  const ELEMENT_DATA: Projects[] = [
    {
      position: 1,
      name: 'Project 1',
      author: 'Edi',
      description: `Project description`,
    },
    {
      position: 2,
      name: 'Project 2',
      author: 'Edi',
      description: `Project description`,
    },
    {
      position: 3,
      name: 'Project 3',
      author: 'Edi',
      description: `Project description`,
    },
    {
      position: 4,
      name: 'Project 4',
      author: 'Edi',
      description: `Project description`,
    },
    {
      position: 5,
      name: 'Project 5',
      author: 'Edi',
      description: `Project description`,
    },
    {
      position: 6,
      name: 'Project 6',
      author: 'Edi',
      description: `Project description`,
    },
    {
      position: 7,
      name: 'Project 7',
      author: 'Edi',
      description: `Project description`,
    },
    {
      position: 8,
      name: 'Project 8',
      author: 'Edi',
      description: `Project description`,
    },
    {
      position: 9,
      name: 'Project 9',
      author: 'Edi',
      description: `Project description`,
    },
    {
      position: 10,
      name: 'Project 10',
      author: 'Edi',
      description: `Project description`,
    },
    {
      position: 11,
      name: 'Project 11',
      author: 'Edi',
      description: `Project description`,
    },
    {
      position: 12,
      name: 'Project 12',
      author: 'Edi',
      description: `Project description`,
    },
    {
      position: 13,
      name: 'Project 13',
      author: 'Edi',
      description: `Project description`,
    },
  ];