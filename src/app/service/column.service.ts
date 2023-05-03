import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Column} from "../models/column";
import {Tasks} from "../models/tasks";


@Injectable({
  providedIn: 'root'
})
export class ColumnService {

  private baseUrl = "/zuul/back10/back10";
  constructor(private http: HttpClient) { }

  getColumn(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/Column`);
  }
  getColumnById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/Column/${id}`);
  }

  updateColumn(id: number, column: Column): Observable<Object> {
    return this.http.put(`${this.baseUrl}/Column/${id}`, column)
  }
  createColumn(column: Column): Observable<Object>{
    return this.http.post(`${this.baseUrl}/Column`, column);
  }
  deleteColumn(id: number): Observable<Object>{
    return this.http.delete(`${this.baseUrl}/Column/${id}`);
  }
  // assignTaskToColumn(columnId: number, taskId: number): Observable<any> {
  //   return this.http.put(`${this.baseUrl}/Column/${columnId}/back10/Task/${taskId}`, null);
  // }
  sortColumn(sortBy: string): Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/Column?keyword=&pageNumber=0&pageSize=10&sortDirection=asc&sortBy=`+sortBy);
  }

}
