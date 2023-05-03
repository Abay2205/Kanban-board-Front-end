import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Column} from "../../../models/column";
import {ColumnService} from "../../../service/column.service";
import {TaskService} from "../../../service/task.service";
import {Tasks} from "../../../models/tasks";


@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.css']
})
export class ColumnComponent implements OnInit {

  searchText: string;
  columns: Column[];
  columnss: Column = new Column();
  taskss: Tasks = new Tasks();
  tasks: Tasks[];

  constructor(private columnService: ColumnService, private router: Router,
              private taskService: TaskService) {
  }

  ngOnInit(): void {
    this.getColumn()

  }

  createTask(id: number) {
    this.router.navigate(['/create-task', id])
  }

  createSubtask(id: number) {
    this.router.navigate(['/create-subtask', id])
  }

  right(columnId: number, taskId: number) {
    this.columnService.getColumnById(columnId + 1).subscribe(data => {
      this.columnss = data
      this.taskService.getTaskById(taskId).subscribe(dataa => {
        this.columnss.tasks.push(dataa)
        this.columnService.updateColumn(columnId + 1, this.columnss).subscribe(data => {
        }, error => console.log(error))

        window.location.reload();
      })
    })
  }

  left(columnId: number, taskId: number) {
    this.columnService.getColumnById(columnId - 1).subscribe(data => {
      this.columnss = data
      this.taskService.getTaskById(taskId).subscribe(dataa => {
        this.columnss.tasks.push(dataa)
        this.columnService.updateColumn(columnId - 1, this.columnss).subscribe(data => {
        }, error => console.log(error))
        window.location.reload();
      })
    })
  }

  private getColumn() {
    this.columnService.getColumn().subscribe((data: any) => { //data: any
      this.columns = data.content; //data.content
    });

  }

  updateColumn(id: number) {
    this.router.navigate(['/update-column', id]);
  }

  deleteColumn(id: number) {
    this.columnService.deleteColumn(id).subscribe(data => {
      this.getColumn();
    })
  }

  updateTask(id: number) {
    this.router.navigate(['/update-task', id]);
  }


  deleteTask(id: number) {
    this.taskService.deleteTask(id).subscribe(data => {
      this.getColumn();
    })
  }

  sortColumn(sortBy: string) {
    this.columnService.sortColumn(sortBy).subscribe((data: any) => {
      this.columns = data.content;
    });
  }

  sortTasks(sortBy: string) {
    this.taskService.sortTasks(sortBy).subscribe((data: any) => {
      this.tasks = data.content;
    });
  }

  taskDetails(id: number) {
    this.router.navigate(['task-details', id]);
  }

  toggleInfo(task: Tasks) {
    task.showInfo = !task.showInfo;
  }
  getRemainingTime(task: Tasks): string {
    const createdAt = new Date(task.createdAt); // преобразование строки в объект типа Date
    const deadline = new Date(createdAt.getTime() + task.deadlineHours * 60 * 60 * 1000);
    const diff = deadline.getTime() - new Date().getTime();
    const diffInHours = Math.floor(diff / (60 * 60 * 1000));
    const diffInMinutes = Math.floor((diff % (60 * 60 * 1000)) / (60 * 1000));
    return `${diffInHours}h ${diffInMinutes}m`;
  }
  getCompletedSubtaskPercent(task: Tasks): number {
    const subtasks = task.subtasks;
    if (!subtasks || subtasks.length === 0) {
      return 0;
    }
    const completedSubtasks = subtasks.filter(subtask => subtask.completed);
    return Math.round((completedSubtasks.length / subtasks.length) * 100);
  }
}
