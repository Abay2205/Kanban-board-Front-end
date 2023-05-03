import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Tasks} from "../models/tasks";

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private baseUrl = "/zuul/back10/back10";
  constructor(private http: HttpClient) { }

  getTasks(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/Task`);
  }
  getTaskById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/Task/${id}`);
  }
  updateTask(id: number, tasks: Tasks): Observable<Object> {
    return this.http.put(`${this.baseUrl}/Task/${id}`, tasks)
  }
  createTask(tasks: Tasks): Observable<Object>{
    return this.http.post(`${this.baseUrl}/Task`, tasks);
  }
  deleteTask(id: number): Observable<Object>{
    return this.http.delete(`${this.baseUrl}/Task/${id}`);
  }
  sortTasks(sortBy: string): Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/Task?keyword=&pageNumber=0&pageSize=10&sortDirection=asc&sortBy=`+sortBy);
  }
}
