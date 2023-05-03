import {Component, OnInit} from '@angular/core';

import {Router} from "@angular/router";

import { JwtHelperService } from '@auth0/angular-jwt';
import {JwtClientService} from "../service/jwt-client.service";
import {UserService} from "../service/user.service";
import {User} from "../models/user";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  users: User[];

  constructor(private service: JwtClientService,
              private router: Router,
              private userService: UserService,
              private jwtHelper :JwtHelperService) {
  }

  username: string;
  password: string;
  response: any;
  tokenPayload: any;
  expToken: any;

  ngOnInit(): void {
    if(this.jwtHelper.isTokenExpired(this.expToken)===true){
      this.router.navigate(["login"])
      console.log(this.jwtHelper.isTokenExpired(this.expToken))
    }
  }

  login(authRequest: object) {
    this.getAccessToken(authRequest)
  }
  register(){
    this.router.navigate(["create-User"])
  }


  public getAccessToken(authRequest: object) {
    this.service.generateToken(authRequest).subscribe((data: any) => {
      let tokenStr = "Bearer " + data.body.access_token;
      this.expToken = data.body.access_token;
      this.GetTokenDecoded()
      localStorage.setItem("token", tokenStr)
      this.router.navigate(["column"]).then(() => {
        window.location.reload();
      });
    })

  }
  GetTokenDecoded(){
    console.log(this.jwtHelper.decodeToken(this.expToken).sub)
    localStorage.setItem("CURRENT_USER1",this.jwtHelper.decodeToken(this.expToken).sub)
    localStorage.setItem("role",this.jwtHelper.decodeToken(this.expToken).roles[0])
    this.tokenPayload = JSON.stringify(this.jwtHelper.decodeToken(this.expToken));
  }
  // isAuthenticated(): boolean {
  //   return !this.jwtHelper.isTokenExpired(this.expToken);
  // }

}
