import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ColumnService} from "../../../service/column.service";
import {Column} from "../../../models/column";

@Component({
  selector: 'app-create-column',
  templateUrl: './create-column.component.html',
  styleUrls: ['./create-column.component.css']
})
export class CreateColumnComponent implements OnInit {

  columns: Column = new Column();
  constructor(private router: Router,
              private route: ActivatedRoute,
              private columnService: ColumnService) { }

  ngOnInit(): void {
  }
  saveTask(){
    this.columnService.createColumn(this.columns).subscribe((data: any) => {
      this.goToTask();
    }, error => console.log(error));
  }
  goToTask(){
    this.router.navigate(['/column'])
  }
  onSubmit(){
    this.saveTask();
  }
}
