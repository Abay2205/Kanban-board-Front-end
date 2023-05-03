import { Component, OnInit } from '@angular/core';
import {TaskService} from "../../../service/task.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Tasks} from "../../../models/tasks";
import {Subtasks} from "../../../models/subtasks";
import {SubtaskService} from "../../../service/subtask.service";

@Component({
  selector: 'app-update-subtask',
  templateUrl: './update-subtask.component.html',
  styleUrls: ['./update-subtask.component.css']
})
export class UpdateSubtaskComponent implements OnInit {

  id: number;
  subtasks: Subtasks = new Subtasks();
  constructor(private subtaskService: SubtaskService,
              private route: ActivatedRoute,
              private router: Router,) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.subtaskService.getSubtaskById(this.id).subscribe(data=>{
      this.subtasks = data;
      console.log(this.subtasks)
    }, error => console.log(error))
  }
  onSubmit() {
    this.subtaskService.updateSubtask(this.id, this.subtasks).subscribe(data => {
      this.gotToProducts();
    }, error => console.log(error));
  }

  gotToProducts() {
    this.router.navigate(['/column']);
  }
}
