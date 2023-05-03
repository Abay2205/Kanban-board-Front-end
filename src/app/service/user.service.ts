import { Injectable } from '@angular/core';
import {User} from "../models/user";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // private baseUrl = "http://localhost:8080/api/";
  private baseUrl = "/zuul";

  // requestHeader = new HttpHeaders(
  //   {"No-auth": "True"}
  // )

  constructor(private http: HttpClient) { }

  getUsers(): Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/auth/useers/`);
  }
  deleteUser(id: number): Observable<Object>{
    return this.http.delete(`${this.baseUrl}/auth/delete/${id}`);
  }

  createUser(user: User): Observable<any>{
    return this.http.post(`${this.baseUrl}/auth/user/save`, user);
  }
  getUserById(id: number): Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/auth/getById/${id}`);
  }
  updateUser(id: number, user: User): Observable<Object>{
    return this.http.put<any>(`${this.baseUrl}/auth/update/${id}`, user);
  }
}
