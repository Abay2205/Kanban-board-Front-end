import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class JwtClientService {

  private baseUrl = "/zuul";

  constructor(private http: HttpClient, private router: Router) {
  }

  public generateToken(request: object) {
    console.log(request)
    return this.http.post(`${this.baseUrl}/login`, request, {observe: 'response'});
  }
}
