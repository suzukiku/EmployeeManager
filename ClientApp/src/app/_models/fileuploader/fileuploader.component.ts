import { Component, EventEmitter, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { FileUploader } from 'ng2-file-upload';

const URL = 'http://localhost:3000/fileupload/';

@Component({
  selector: 'app-fileuploader',
  templateUrl: './fileuploader.component.html',
  styleUrls: ['./fileuploader.component.css']
})
export class FileuploaderComponent implements OnInit {
  constructor() { }

  url = 'https://evening-anchorage-3159.herokuapp.com/api/';

  uploader = new FileUploader({
    url: this.url,
    maxFileSize: 1024 * 1024 * 1
    });
  name = 'Angular 5';

  ngOnInit() {
    this.uploader.onAfterAddingFile = (file) => {
      console.log('***** onAfterAddingFile ******')
      console.log('file ', file)
    }

    this.uploader.onCompleteItem =  (item:any, response:any, status:any, headers:any) => {
      console.log('ImageUpload:uploaded:', item, status, response);
    };

    this.uploader.onCompleteAll = () => {
      console.log('******* onCompleteAll *********')
    }

    this.uploader.onWhenAddingFileFailed = (item: any, filter: any, options: any) => {
      console.log('***** onWhenAddingFileFailed ********')
    }
  }
}