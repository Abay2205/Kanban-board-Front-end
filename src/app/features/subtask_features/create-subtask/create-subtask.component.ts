import { Component, OnInit } from '@angular/core';
import {Tasks} from "../../../models/tasks";
import {Column} from "../../../models/column";
import {TaskService} from "../../../service/task.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ColumnService} from "../../../service/column.service";
import {Subtasks} from "../../../models/subtasks";
import {SubtaskService} from "../../../service/subtask.service";

@Component({
  selector: 'app-create-subtask',
  templateUrl: './create-subtask.component.html',
  styleUrls: ['./create-subtask.component.css']
})
export class CreateSubtaskComponent implements OnInit {

  tasks: Tasks = new Tasks();
  subtasks: Subtasks = new Subtasks();
  task: object
  id: number
  constructor(private taskService: TaskService,
              private router: Router,
              private route: ActivatedRoute,
              private subtaskService: SubtaskService
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    console.log(this.id)

  }

  saveSubtask(){
    this.subtaskService.createSubtask(this.subtasks).subscribe((dataa: any) => {
      this.goToTask();
      this.assignSubtaskToTask(dataa)
    }, error => console.log(error));

  }
  assignSubtaskToTask(dataa: any){
    this.taskService.getTaskById(this.id).subscribe(data => {
      this.tasks=data
      this.tasks.subtasks.push(dataa);
      this.task = this.tasks
      console.log(typeof this.tasks)
      console.log(this.tasks)
      this.taskService.updateTask(this.id, this.tasks).subscribe(data => {
      },error => console.log(error))
      // window.location.reload();
    })
  }

  goToTask(){
    this.router.navigate(['/column'])
  }
  onSubmit(){
    this.saveSubtask();
  }
}

