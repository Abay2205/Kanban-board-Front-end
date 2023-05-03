import {Component, OnInit} from '@angular/core';
import {Chart, registerables} from "chart.js";
import {TaskService} from "../../service/task.service";
import {ColumnService} from "../../service/column.service";

Chart.register(...registerables)

@Component({
  selector: 'app-mychart',
  templateUrl: './mychart.component.html',
  styleUrls: ['./mychart.component.css']
})
export class MychartComponent implements OnInit {

  constructor(private taskService: TaskService,
              private columnService: ColumnService) {
  }

  chartColData: any
  labelData: any[] = [];
  mainData: any[] = [];
  colorData: any[]=[];

  ngOnInit(): void {
    this.columnService.getColumn().subscribe((data: any) => {
      this.chartColData = data.content;
      for (let i = 0; i < this.chartColData.length; i++) {
        for (let j = 0; j < this.chartColData[i].tasks.length; j++) {
          this.labelData.push(this.chartColData[i].tasks[j].taskName)
          this.mainData.push(this.chartColData[i].tasks[j].priority)
          this.colorData.push(this.chartColData[i].color)
        }
      }
      this.RenderChart(this.labelData, this.mainData, this.colorData, "pie", "piechart")
    })
  }

  RenderChart(labelData: any, mainData: any, colorData: any, type: any, id: any) {
    const myChart = new Chart(id, {
      type: type,
      data: {
        labels: labelData,
        datasets: [{
          label: 'priority',
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
}
