import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { Stores } from './models/stores';
import { WebService } from './web.service';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  constructor(private webService: WebService) {}

  //fetch filtered data
  filterData(filterData: any[]) {
    return this.webService.post('stores', filterData);
  }

  // fetch lat long filtered data
  filterLLData(filterLLData: any[]) {
    return this.webService.post('fetchLLData', filterLLData);
  }

  //get specific store details
  getStoreDetails(storeID: string) {
    return this.webService.get('fetchStoreDetails/' + storeID);
  }

  //fetch store's data as the maps zoom out
  fetchZoomData(bounds: any[]) {
    return this.webService.post('fetchZoomData', bounds);
  }

  //post the converted json data
  uploadFiles(payload: object) {
    return this.webService.post('insertData', payload);
  }
}
