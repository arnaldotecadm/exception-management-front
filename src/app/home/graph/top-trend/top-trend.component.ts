import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import * as Chartist from 'chartist';
import { Observable } from 'rxjs';
import { GraphByMonth, GraphModel } from '../../graph-by-month.interface';
import { HomeService } from '../../home.service';

@Component({
  selector: 'app-top-trend',
  templateUrl: './top-trend.component.html',
  styleUrls: ['./top-trend.component.css'],
})
export class TopTrendComponent implements OnInit {
  @Input() application = '';

  exceptionList$ = new Observable();

  graphList: any = [];

  numberExceptions = 0;

  constructor(
    private homeService: HomeService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadChart();
  }

  ngOnChanges(changes: import('@angular/core').SimpleChanges): void {
    if (changes.application) {
      this.loadChart();
    }
  }

  loadChart() {
    this.graphList = [];
    this.numberExceptions = 0;
    this.homeService
      .getTopTrendExceptionDetail(this.application, 1)
      .subscribe((data: GraphByMonth[]) => {
        data.forEach((graph) => {
          const graphUnit: any = [];
          graphUnit.labels = [];
          graphUnit.series = [];
          graphUnit.total = 0;

          graphUnit.title = graph.exceptionType;
          graph.graphModelList.forEach((model: GraphModel) => {
            graphUnit.labels.push(model.day);
            graphUnit.series.push(model.count);
            graphUnit.total += model.count;
          });

          this.graphList.push(graphUnit);
          this.numberExceptions += graphUnit.total;
        });

        this.cdr.detectChanges();
        this.compilarGraficos();
      });
  }

  compilarGraficos() {
    this.graphList.forEach((graph) => {
      this.initGraph(graph);
    });
  }
  initGraph(graph) {
    /* ----------==========     Daily Sales Chart initialization For Documentation    ==========---------- */

    const dataDailySalesChart: any = {
      labels: graph.labels,
      series: [graph.series],
    };

    const optionsDailySalesChart: any = {
      lineSmooth: Chartist.Interpolation.cardinal({
        tension: 0,
      }),
      hover: true,
      low: 0,
      high: 50, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
      chartPadding: { top: 0, right: 0, bottom: 0, left: 0 },
    };

    const responsiveOptions: any[] = [
      [
        'screen and (max-width: 640px)',
        {
          seriesBarDistance: 5,
          axisX: {
            labelInterpolationFnc: function (value) {
              return value[0];
            },
          },
        },
      ],
    ];

    const dailySalesChart = new Chartist.Line(
      '#' + graph.title,
      dataDailySalesChart,
      optionsDailySalesChart,
      responsiveOptions
    );
    this.startAnimationForLineChart(dailySalesChart);
  }

  startAnimationForLineChart(chart) {
    let seq: any, delays: any, durations: any;
    seq = 0;
    delays = 80;
    durations = 500;

    chart.on('draw', function (data) {
      if (data.type === 'line' || data.type === 'area') {
        data.element.animate({
          d: {
            begin: 600,
            dur: 700,
            from: data.path
              .clone()
              .scale(1, 0)
              .translate(0, data.chartRect.height())
              .stringify(),
            to: data.path.clone().stringify(),
            easing: Chartist.Svg.Easing.easeOutQuint,
          },
        });
      } else if (data.type === 'point') {
        seq++;
        data.element.animate({
          opacity: {
            begin: seq * delays,
            dur: durations,
            from: 0,
            to: 1,
            easing: 'ease',
          },
        });
      }
    });

    seq = 0;
  }

  startAnimationForBarChart(chart) {
    let seq2: any, delays2: any, durations2: any;

    seq2 = 0;
    delays2 = 80;
    durations2 = 500;
    chart.on('draw', function (data) {
      if (data.type === 'bar') {
        seq2++;
        data.element.animate({
          opacity: {
            begin: seq2 * delays2,
            dur: durations2,
            from: 0,
            to: 1,
            easing: 'ease',
          },
        });
      }
    });

    seq2 = 0;
  }
}
