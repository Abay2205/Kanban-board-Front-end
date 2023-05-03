import { Component, OnInit } from '@angular/core';
import {TaskService} from "../../../service/task.service";
import {Router} from "@angular/router";
import {Tasks} from "../../../models/tasks";
import {Column} from "../../../models/column";
import {SubtaskService} from "../../../service/subtask.service";
import {Subtasks} from "../../../models/subtasks";

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  searchText: string;

  tasks: Tasks[];
  subtasks: Subtasks[];
  constructor(private taskService: TaskService, private router: Router, private subtaskService: SubtaskService) { }

  ngOnInit(): void {
    this.getTask()
  }

// private getSubtask(){
//     this.subtaskService.getSubtasks().subscribe((data: any) => {
//       this.subtasks=data.content;
//     })
// }

  private getTask(){
    this.taskService.getTasks().subscribe((data: any) => { //data: any
      this.tasks = data.content; //data.content
    });
  }
  updateTask(id: number){
    this.router.navigate(['/update-task', id]);
  }
  deleteTask(id: number){
    this.taskService.deleteTask(id).subscribe(data => {
      this.getTask();
    })
  }
}
