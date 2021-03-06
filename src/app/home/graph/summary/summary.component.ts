import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import Chart from 'chart.js';
import { GraphGrouppedByType } from '../../graph-by-month.interface';
import { HomeService } from '../../home.service';

@Component({
  selector: 'app-chart-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css'],
})
export class SummaryComponent implements OnInit {
  @Input() application = '';
  @Output() loaded = new EventEmitter<string[]>();
  @Output() labelSelected = new EventEmitter<string>();

  public canvas: any;
  public chartEmail;
  public ctx;
  legends = [];
  filterOpts = [];
  panelOpenState = false;

  constructor(private homeService: HomeService) {}

  ngOnChanges(changes: import('@angular/core').SimpleChanges): void {
    if (changes.application) {
      this.loadChart();
    }
  }

  ngOnInit(): void {}

  labelClicked(value) {
    this.labelSelected.emit(value);
  }

  loadChart() {
    if (this.chartEmail) {
      this.chartEmail.destroy();
    }
    const legendas = [];
    const dados = [];
    const cores = [];
    this.legends = [];
    this.filterOpts = [];
    this.homeService
      .getAllPercentages(this.application)
      .subscribe((data: GraphGrouppedByType[]) => {
        data.forEach((info) => {
          legendas.push(info.typeName);
          dados.push(info.count);
          const dynamicColors =
            'rgb(' +
            Math.floor(Math.random() * 255) +
            ',' +
            Math.floor(Math.random() * 255) +
            ',' +
            Math.floor(Math.random() * 255) +
            ')';
          cores.push(dynamicColors);
          this.legends.push({ color: dynamicColors, nome: info.typeName });
          this.filterOpts.push(info.typeName);
        });

        this.canvas = document.getElementById('summaryChart');
        this.ctx = this.canvas.getContext('2d');

        this.chartEmail = new Chart(this.ctx, {
          type: 'pie',
          data: {
            labels: legendas,
            datasets: [
              {
                label: 'Emails',
                pointRadius: 0,
                pointHoverRadius: 0,
                backgroundColor: cores,
                borderWidth: 0,
                data: dados,
              },
            ],
          },

          options: {
            legend: {
              display: false,
              position: 'left',
              align: 'center',
            },

            pieceLabel: {
              render: 'percentage',
              fontColor: ['red'],
              precision: 2,
            },

            tooltips: {
              enabled: true,
            },
          },
        });
      });

    this.loaded.emit(this.filterOpts);
  }
}
