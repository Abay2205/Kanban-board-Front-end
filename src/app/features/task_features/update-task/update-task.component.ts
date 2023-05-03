import { Component, OnInit } from '@angular/core';
import {Tasks} from "../../../models/tasks";
import {TaskService} from "../../../service/task.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FileService} from "../../../service/file.service";
import {TasksComponent} from "../tasks/tasks.component";

@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.component.html',
  styleUrls: ['./update-task.component.css']
})
export class UpdateTaskComponent implements OnInit {

  id: number;
  tasks: Tasks = new Tasks();


  constructor(private taskService: TaskService,
              private route: ActivatedRoute,
              private router: Router,
              private fileService: FileService) {
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.taskService.getTaskById(this.id).subscribe(data => {
      console.log(this.id)
      this.tasks = data;
    }, error => console.log(error))
  }
  onSubmit() {
    this.taskService.updateTask(this.id, this.tasks).subscribe(data => {
      this.gotToProducts();
    }, error => console.log(error));
  }

  gotToProducts() {
    this.router.navigate(['/column']);
  }


  onUploadFiles(files: File[]): void {
    const formData = new FormData();
    for (const file of files) { formData.append('files', file, file.name); }
    console.log(formData);
    this.fileService.upload(formData).toPromise().then((image)=> {
      console.log('x = ',image.id)
      console.log(image)
      this.tasks.taskImageId = image.id;
      console.log(this.tasks.taskImageId)
    })
  }

  onDownloadFile(filename: string): void {
    this.fileService.download(filename).subscribe((data: any) => {
        this.tasks = data.content;
      }

    )
  }
}
