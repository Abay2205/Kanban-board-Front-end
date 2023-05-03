import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {TaskService} from "../../../service/task.service";
import {Tasks} from "../../../models/tasks";
import {SubtaskService} from "../../../service/subtask.service";
import {Subtasks} from "../../../models/subtasks";
import {Chart} from "chart.js";

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css']
})
export class TaskDetailsComponent implements OnInit {
  id: number;
  subtaskCompleted: boolean;
  subtasks: Subtasks = new Subtasks();
  tasks: Tasks = new Tasks();
  labelData: any[] = [];
  mainData: any[] = [];
  colorData: any[]=['lime', 'darkred'];
  constructor(private route: ActivatedRoute,
              private taskService: TaskService,
              private subtaskService: SubtaskService,
              private router: Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id']
    this.taskService.getTaskById(this.id).subscribe(data => {
      this.tasks = data;
      let completed = 0;
      let uncompleted = 0;
      for(let i = 0; i < this.tasks.subtasks.length; i++){
        if (this.tasks.subtasks[i].completed) {
          completed++;
        } else {
          uncompleted++;
        }
        this.mainData = [completed, uncompleted]
        this.labelData = ["completed", "uncompleted"]
      }
      this.RenderChart(this.labelData, this.mainData, this.colorData, "pie", "piechart")
    }, error => console.log(error))
  }
  RenderChart(labelData: any, mainData: any, colorData: any, type: any, id: any) {
    const myChart = new Chart(id, {
      type: type,
      data: {
        labels: labelData,
        datasets: [{
          label: 'completed',
          data: mainData,
          backgroundColor: colorData,
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
  getRemainingTime(task: Tasks): string {
    const createdAt = new Date(task.createdAt); // преобразование строки в объект типа Date
    const deadline = new Date(createdAt.getTime() + task.deadlineHours * 60 * 60 * 1000);
    const diff = deadline.getTime() - new Date().getTime();
    const diffInHours = Math.floor(diff / (60 * 60 * 1000));
    const diffInMinutes = Math.floor((diff % (60 * 60 * 1000)) / (60 * 1000));
    return `${diffInHours}h ${diffInMinutes}m`;
  }
  deleteSubtask(subtaskId: number) {
    this.subtaskService.deleteSubtask(subtaskId).subscribe(data => {
      this.taskService.getTaskById(this.id).subscribe(data => {
        console.log(this.id)
        this.tasks = data;
      }, error => console.log(error))
    })
  }
  updateSubtask(id: number) {
    this.router.navigate(['/update-subtask', id]);
  }
  Changer(id: number){
    this.subtaskService.getSubtaskById(id).subscribe(data => {
      this.subtasks = data;
      this.subtasks.completed = !this.subtasks.completed
      console.log(this.subtasks)
      this.subtaskService.updateSubtask(id, this.subtasks).subscribe(data => {
        this.subtaskCompleted = this.subtasks.completed;
        location.reload(); // перезагрузка страницы
      }, error => console.log(error))
    }, error => console.log(error))
  }
}
