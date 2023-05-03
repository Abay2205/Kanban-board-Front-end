import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FileService {

  private baseUrl = "/zuul/back10/back10";

  constructor(private http: HttpClient) {
  }

  upload(formData: FormData): Observable<any>{
    return this.http.post(`${this.baseUrl}/photo/upload`, formData);
  }
  download(filename: string): Observable<any>{
    return this.http.get(`${this.baseUrl}/photo/download/${filename}`);
  }
}
