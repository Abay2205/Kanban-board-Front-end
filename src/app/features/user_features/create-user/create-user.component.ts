import { Component, OnInit } from '@angular/core';
import {UserService} from "../../../service/user.service";
import {User} from "../../../models/user";
import {Router} from "@angular/router";
import {Role} from "../../../models/role";


@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  user: User = new User();
  // roles: Role[] = [
  //   { id: 1, name: 'Admin' },
  //   { id: 2, name: 'User' }
  // ];
  selectedRole: any;

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  saveUser(): void {
    this.user.roles = [{name: 'User'}];
    this.userService.createUser(this.user).subscribe(
      (data: any) => {
        console.log(data);
        this.goToUsers();
      },
      error => console.log(error)
    );
  }

  goToUsers(): void {
    this.router.navigate(['/login']);
  }

  onSubmit(): void {
    this.saveUser();
  }

}
