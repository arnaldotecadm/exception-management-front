import { Component, Input, OnChanges, OnInit } from '@angular/core';
import Chart from 'chart.js';
import { GraphByMonth } from '../../graph-by-month.interface';
import { HomeService } from '../../home.service';

@Component({
  selector: 'app-top-exception',
  templateUrl: './top-exception.component.html',
  styleUrls: ['./top-exception.component.css'],
})
export class TopExceptionComponent implements OnInit, OnChanges {
  @Input() application = '';
  legends = [];
  grafico: any;

  constructor(private homeService: HomeService) {}

  ngOnInit() {}

  ngOnChanges(changes: import('@angular/core').SimpleChanges): void {
    if (changes.application) {
      this.loadChart();
    }
  }

  loadChart() {
    if (this.grafico) {
      this.grafico.destroy();
    }
    const exceptionGrowthByMonth = document.getElementById(
      'exceptionGrowthByMonth'
    );

    const typeList = [];
    const labelsMonthly = [];
    const cores = ['#fbc658', '#426cbb', '#74c656', '#ac60ce', '#ff2121'];
    let contador = 0;
    this.legends = [];
    this.homeService
      .getGrouppedByMonth(this.application, 5)
      .subscribe((dados: GraphByMonth[]) => {
        if (!dados || dados.length === 0) {
          return;
        }
        dados[0].graphModelList.forEach((d) => {
          labelsMonthly.push(d.year + '/' + d.month);
        });

        dados.forEach((d) => {
          const dadoArray = [];
          this.legends.push({
            nome: d.exceptionType,
            color: cores[contador],
          });
          d.graphModelList.forEach((data) => {
            dadoArray.push(data.count);
          });
          typeList.push({
            data: dadoArray,
            fill: false,
            borderColor: cores[contador],
            backgroundColor: 'transparent',
            pointBorderColor: cores[contador],
            pointRadius: 4,
            pointHoverRadius: 4,
            pointBorderWidth: 8,
          });
          contador++;
        });

        const monthlyData = {
          labels: labelsMonthly,
          datasets: typeList,
        };

        const chartOptions = {
          legend: {
            display: false,
            position: 'top',
          },
        };

        this.grafico = new Chart(exceptionGrowthByMonth, {
          type: 'line',
          hover: true,
          data: monthlyData,
          options: chartOptions,
        });
      });
  }
}
