import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { distinctUntilChanged } from 'rxjs/operators';

import * as Highcharts from 'highcharts';
declare var require: any;
require('highcharts/highcharts-more')(Highcharts);

// import {
//   AppState,
//   selectFeatureChartDataResponse
// } from './store/reducers/chart-data-response.reducer';

import { ChartDataResponse } from './data/data.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  data: ChartDataResponse[];

  Highcharts: typeof Highcharts = Highcharts; // required
  chartConstructor: string = 'chart'; // optional string, defaults to 'chart'
  chartOptions; // required
  updateFlag: boolean = false; // optional boolean
  oneToOneFlag: boolean = true; // optional boolean, defaults to false
  runOutsideAngular: boolean = false; // optional boolean, defaults to false

  constructor(private store: Store<any>) {}

  ngOnInit() {
    // this.store
    //   .select(state => state.feature.chartDataResponses)
    //   .pipe(distinctUntilChanged())
    //   .subscribe(data => (this.data = data));
    this.store.pipe(distinctUntilChanged()).subscribe(data => {
      this.data = data.chartDataResponse.chartDataResponses;
      console.log(this.jsonToHighcharts(this.data));
      this.chartOptions = this.jsonToHighcharts(this.data);
    });
  }

  // input: [{years: 0, median: 15000, min: 15000, max: 15000}, {years: 1, median: 16132.653394780244, min: 15518.019012501183, max: 16747.287777059304}]
  // output:
  jsonToHighcharts(json) {
    let median = [];
    let minMax = [];
    json.forEach(element => {
      median.push(element['median']);
      minMax.push([element['min'], element['max']]);
    });
    return {
      chart: {
        type: 'line'
      },

      title: {
        text: 'Total growth of capital'
      },

      yAxis: {
        title: {
          text: 'Capital'
        }
      },
      legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle'
      },

      tooltip: {
        crosshairs: true,
        shared: true
      },

      plotOptions: {
        series: {
          label: {
            connectorAllowed: false
          },
          pointStart: 0
        }
      },

      series: [
        {
          name: 'Median',
          data: median,
          zIndex: 1,
          marker: {
            fillColor: 'white',
            lineWidth: 2,
            lineColor: Highcharts.getOptions().colors[0]
          }
        },

        {
          name: 'MinMax',
          data: minMax,
          type: 'arearange',
          lineWidth: 0,
          linkedTo: ':previous',
          color: Highcharts.getOptions().colors[0],
          fillOpacity: 0.3,
          zIndex: 0,
          marker: {
            enabled: false
          }
        }
      ],

      responsive: {
        rules: [
          {
            condition: {
              maxWidth: 500
            },
            chartOptions: {
              legend: {
                layout: 'horizontal',
                align: 'center',
                verticalAlign: 'bottom'
              }
            }
          }
        ]
      }
    };
  }
}
