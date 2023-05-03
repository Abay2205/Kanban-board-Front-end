import { Component, OnInit } from '@angular/core';
import {Tasks} from "../../../models/tasks";
import {Column} from "../../../models/column";
import {TaskService} from "../../../service/task.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FileService} from "../../../service/file.service";
import {ColumnService} from "../../../service/column.service";

@Component({
  selector: 'app-update-column',
  templateUrl: './update-column.component.html',
  styleUrls: ['./update-column.component.css']
})
export class UpdateColumnComponent implements OnInit {
  id: number;
  columns: Column = new Column();
  constructor(private columnService: ColumnService,
              private route: ActivatedRoute,
              private router: Router,
              private fileService: FileService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.columnService.getColumnById(this.id).subscribe(data => {
      this.columns = data;
      console.log(typeof this.columns)
    }, error => console.log(error))
  }


  onSubmit() {
    this.columnService.updateColumn(this.id, this.columns).subscribe(data => {
      this.goToProducts();
    }, error => console.log(error));
  }

  goToProducts() {
    this.router.navigate(['/column']);
  }

}
