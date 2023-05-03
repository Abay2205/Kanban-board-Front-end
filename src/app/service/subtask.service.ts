import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Tasks} from "../models/tasks";
import {Subtasks} from "../models/subtasks";

@Injectable({
  providedIn: 'root'
})
export class SubtaskService {

  private baseUrl = "/zuul/back10/back10";
  constructor(private http: HttpClient) { }

  getSubtasks(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/Subtask`);
  }
  getSubtaskById(subtaskId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/Subtask/${subtaskId}`);
  }
  updateSubtask(subtaskId: number, subtasks: Subtasks): Observable<Object> {
    return this.http.put(`${this.baseUrl}/Subtask/${subtaskId}`, subtasks)
  }
  createSubtask(subtasks: Subtasks): Observable<Object>{
    return this.http.post(`${this.baseUrl}/Subtask`, subtasks);
  }
  deleteSubtask(subtaskId: number): Observable<Object>{
    return this.http.delete(`${this.baseUrl}/Subtask/${subtaskId}`);
  }
}
