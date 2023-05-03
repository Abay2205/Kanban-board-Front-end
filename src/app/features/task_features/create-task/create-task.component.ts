import { Component, OnInit } from '@angular/core';
import {Tasks} from "../../../models/tasks";
import {TaskService} from "../../../service/task.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ColumnService} from "../../../service/column.service";
import {Column} from "../../../models/column";

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent implements OnInit {

  tasks: Tasks = new Tasks();
  columns: Column = new Column();
  col: object
  id: number
  constructor(private taskService: TaskService,
              private router: Router,
              private route: ActivatedRoute,
              private columnService: ColumnService
              ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    console.log(this.id)

  }

  saveTask(){
    this.taskService.createTask(this.tasks).subscribe((dataa: any) => {
      this.goToTask();
      this.assignTaskToColumn(dataa)
    }, error => console.log(error));

  }
  assignTaskToColumn(dataa: any){
    this.columnService.getColumnById(this.id).subscribe(data => {
      this.columns=data
      this.columns.tasks.push(dataa);
      this.col = this.columns
      console.log(typeof this.columns)
      console.log(this.col)
      this.columnService.updateColumn(this.id, this.columns).subscribe(data => {
      },error => console.log(error))
      window.location.reload();
    })
  }

  goToTask(){
    this.router.navigate(['/column'])
  }
  onSubmit(){
    this.saveTask();
    }
  }

