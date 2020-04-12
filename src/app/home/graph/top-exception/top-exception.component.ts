import {
  Component,
  OnInit,
  Input,
  AfterContentInit,
  OnChanges,
} from "@angular/core";

import * as Chartist from "chartist";
import Chart from "chart.js";
import { GraphByMonth } from "../../graph-by-month.interface";
import { HomeService } from "../../home.service";

@Component({
  selector: "app-top-exception",
  templateUrl: "./top-exception.component.html",
  styleUrls: ["./top-exception.component.css"],
})
export class TopExceptionComponent implements OnInit, OnChanges {
  @Input() application: string = "";

  constructor(private homeService: HomeService) {}

  legends = [];

  grafico: any;

  ngOnInit() {}

  ngOnChanges(changes: import("@angular/core").SimpleChanges): void {
    if (changes.application) {
      this.loadChart();
    }
  }

  loadChart() {
    if (this.grafico) {
      this.grafico.destroy();
    }
    var exceptionGrowthByMonth = document.getElementById(
      "exceptionGrowthByMonth"
    );

    var typeList = [];
    var labelsMonthly = [];
    var cores = ["#fbc658", "#426cbb", "#74c656", "#ac60ce", "#ff2121"];
    var contador = 0;
    this.legends = [];
    this.homeService
      .getGrouppedByMonth(this.application, 5)
      .subscribe((dados: GraphByMonth[]) => {
        if (!dados || dados.length == 0) {
          return;
        }
        dados[0].graphModelList.forEach((d) => {
          labelsMonthly.push(d.year + "/" + d.month);
        });

        dados.forEach((d) => {
          var dadoArray = [];
          this.legends.push({
            nome: d.exceptionType,
            color: cores[contador],
          });
          d.graphModelList.forEach((d) => {
            dadoArray.push(d.count);
          });
          typeList.push({
            data: dadoArray,
            fill: false,
            borderColor: cores[contador],
            backgroundColor: "transparent",
            pointBorderColor: cores[contador],
            pointRadius: 4,
            pointHoverRadius: 4,
            pointBorderWidth: 8,
          });
          contador++;
        });

        var monthlyData = {
          labels: labelsMonthly,
          datasets: typeList,
        };

        var chartOptions = {
          legend: {
            display: false,
            position: "top",
          },
        };

        this.grafico = new Chart(exceptionGrowthByMonth, {
          type: "line",
          hover: true,
          data: monthlyData,
          options: chartOptions,
        });
      });
  }
}
