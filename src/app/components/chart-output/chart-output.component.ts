import { Component, Input, OnChanges } from '@angular/core';

import * as Highcharts from 'highcharts';
declare var require: any;
require('highcharts/highcharts-more')(Highcharts);

@Component({
  selector: 'app-chart-output',
  templateUrl: './chart-output.component.html',
  styleUrls: ['./chart-output.component.scss']
})
export class ChartOutputComponent implements OnChanges {
  @Input()
  data;

  Highcharts: typeof Highcharts = Highcharts; // required
  chartConstructor: string = 'chart'; // optional string, defaults to 'chart'
  chartOptions; // required
  updateFlag: boolean = false; // optional boolean
  oneToOneFlag: boolean = true; // optional boolean, defaults to false
  runOutsideAngularFlag: boolean = false; // optional boolean, defaults to false

  constructor() {}

  ngOnChanges(): void {
    if (!this.data) {
      return;
    }

    this.chartOptions = this.jsonToHighchartsOptions(this.data);
  }

  jsonToHighchartsOptions(json) {
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
