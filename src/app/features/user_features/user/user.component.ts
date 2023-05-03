import { Component, OnInit } from '@angular/core';
import {User} from "../../../models/user";
import {UserService} from "../../../service/user.service";
import {Router} from "@angular/router";
import {JwtHelperService} from "@auth0/angular-jwt";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  users: User[];
  constructor(
    public userService: UserService,
    private jwtHelper :JwtHelperService,
    private router:Router) {
  }

  ngOnInit(): void {
    this.getUser()
  }

  private getUser() {
    this.userService.getUsers().subscribe((data: any) => {
      // console.log(data.roles[0].name)
      this.users = data;

    });
  }
  deleteUser(id: number){
    this.userService.deleteUser(id).subscribe(data => {
      console.log(data)
      this.getUser()
    })
  }
  updateUser(id: number){
    this.router.navigate(["update-User", id]);
  }
}


