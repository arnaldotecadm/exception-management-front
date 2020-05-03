import { Component, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { MatSelect, MatSelectChange } from '@angular/material/select';
import Chart from 'chart.js';
import { GraphModel } from '../../graph-by-month.interface';
import { HomeService } from '../../home.service';

@Component({
  selector: 'app-detail-by-type',
  templateUrl: './detail-by-type.component.html',
  styleUrls: ['./detail-by-type.component.css'],
})
export class DetailByTypeComponent implements OnInit, OnChanges {
  @ViewChild('selectExceptionType', { static: true }) selectOption: MatSelect;

  @Input() inputValues = [];

  @Input() application = '';

  @Input() selectedLabel = '';

  selectedOption = '';

  chart: any;

  numberExceptions = 0;

  constructor(private homeService: HomeService) {}

  ngOnChanges(changes: import('@angular/core').SimpleChanges): void {
    if (changes.inputValues) {
      this.selectOption.value = '';
      this.selectedOption = '';
      this.numberExceptions = 0;
      if (this.chart) {
        this.chart.destroy();
      }
    } else if (changes.selectedLabel) {
      this.selectOption.value = this.selectedLabel;
      this.selectedOption = this.selectedLabel;
      this.loadChart();
    }
  }

  changeFilter(change: MatSelectChange) {
    this.selectedOption = change.value;
    this.loadChart();
  }

  ngOnInit(): void {
    this.loadChart();
  }

  loadChart() {
    this.homeService
      .getDetailByType(this.application, this.selectedOption)
      .subscribe((data: GraphModel[]) => {
        const chartData: number[] = [];
        const chartLegend = [];
        this.numberExceptions = 0;
        data.forEach((info) => {
          chartData.push(info.count);
          this.numberExceptions += info.count;
          chartLegend.push(info.month + '/' + info.year);
        });

        this.buildChartInfo(chartData, chartLegend);
      });
  }

  buildChartInfo(chartData: number[], chartlabel = []) {
    const speedCanvas = document.getElementById('speedChart');

    const dataFirst = {
      data: chartData,
      fill: false,
      borderColor: '#fbc658',
      backgroundColor: 'transparent',
      pointBorderColor: '#fbc658',
      pointRadius: 4,
      pointHoverRadius: 4,
      pointBorderWidth: 8,
    };

    const speedData = {
      labels: chartlabel,
      datasets: [dataFirst],
    };

    const chartOptions = {
      legend: {
        display: false,
        position: 'top',
      },
    };

    this.chart = new Chart(speedCanvas, {
      type: 'line',
      hover: false,
      data: speedData,
      options: chartOptions,
    });
  }
}
