import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WebService {
  readonly ROOT_URL: any;
  constructor(private http: HttpClient) {
    this.ROOT_URL = 'http://localhost:3000';
  }

  //http post call
  post(url: string, payload: object) {
    return this.http.post(`${this.ROOT_URL}/${url}`, payload);
  }

  //htp get call
  get(url: string) {
    return this.http.get(`${this.ROOT_URL}/${url}`);
  }
}
