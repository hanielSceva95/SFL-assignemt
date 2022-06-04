import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Stores } from 'src/app/models/stores';
import { StoreService } from 'src/app/store.service';
import { NgxCsvParser, NgxCSVParserError } from 'ngx-csv-parser';
import {
  HttpClient,
  HttpEventType,
  HttpProgressEvent,
} from '@angular/common/http';
import { finalize, Subscription } from 'rxjs';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-stores-view',
  templateUrl: './stores-view.component.html',
  styleUrls: ['./stores-view.component.scss'],
})
export class StoresViewComponent implements OnInit {
  stores: Stores[] = [];
  csvRecords: any;
  fileName: string = '';
  requiredFileType: string = '.csv';
  uploadProgress: number | undefined | null;
  uploadSub: any;
  displayColumns = ['storeID', 'lat', 'long', 'view'];

  constructor(private storesService: StoreService, private http: HttpClient) {}

  // file upload code
  @ViewChild('fileImportInput') fileImportInput: any;

  fileChangeListener($event: Event, files: any): void {
    const file: File = files[0];
    if (file) {
      this.fileName = file.name;
      const formData = new FormData();
      formData.append('file', file);
      console.log(formData.get('file'), 'formData');
      const upload$ = this.http
        .post('http://localhost:3000/file', formData)
        .pipe(finalize(() => this.reset()));

      this.uploadSub = upload$.subscribe((event: any) => {
        if (event.type === HttpEventType.UploadProgress) {
          const total = event.total;
          this.uploadProgress = Math.round(100 * (event?.loaded / total));
        }
      });
    }
  }

  //cancel file upload
  cancelUpload() {
    this.uploadSub.unsubscribe();
    this.reset();
  }

  //resets progress bar
  reset() {
    this.uploadProgress = null;
    this.uploadSub = null;
  }

  ngOnInit(): void {}

  //To fetch filtered data using days, zone, availability
  submit(FilterData: any) {
    this.storesService
      .filterData(FilterData.form.value)
      .subscribe((storesData: any) => {
        console.log(storesData[0]);
        this.stores = storesData;
      });
  }

  //To fetch filtered data using latitude, longitude
  submitLatLong(FilterLLData: any) {
    this.storesService
      .filterLLData(FilterLLData.form.value)
      .subscribe((storesData: any) => {
        this.stores = storesData;
      });
  }

  //to insert new data in json format
  uploadData(csvData: Stores[]) {
    this.storesService.uploadFiles(csvData).subscribe((storesData: any) => {
      this.stores = storesData;
    });
  }
}
