import { Component, OnInit } from '@angular/core';
import {User} from "../../../models/user";
import {UserService} from "../../../service/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Role} from "../../../models/role";

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {

  id: number;
  user: User = new User();
  roles: Role[] = [
    { id: 1, name: 'Admin' },
    { id: 2, name: 'User' }
  ];

  constructor(private userService: UserService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.userService.getUserById(this.id).subscribe(data=>{
      this.user = data;
      console.log(this.user)
    }, error => console.log(error))
  }
  currentUser = localStorage.getItem("CURRENT_USER1")
  onSubmit(){
    this.userService.updateUser(this.id, this.user).subscribe(data => {
      this.goToUser();
    }, error => console.log(error))
  }
  goToUser(){
    this.router.navigate(['/users'])
  }

}
