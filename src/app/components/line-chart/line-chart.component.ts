import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  ViewChild,
  ViewEncapsulation
} from "@angular/core";
import * as d3 from "d3";

import { ChartDataResponse } from "src/app/data/data.model";

@Component({
  selector: "app-line-chart",
  encapsulation: ViewEncapsulation.None,
  templateUrl: "./line-chart.component.html",
  styleUrls: ["./line-chart.component.scss"]
})
export class LineChartComponent implements OnChanges {
  @ViewChild("chart", { static: false })
  private chartContainer: ElementRef;

  @Input()
  data: ChartDataResponse[];

  constructor() {}

  ngOnChanges(): void {
    if (!this.data) {
      return;
    }

    this.createChart();
  }

  private createChart(): void {
    d3.select("svg").remove();

    if (!this.chartContainer) {
      return;
    }

    const element = this.chartContainer.nativeElement;
    const data = this.data;

    const width = element.offsetWidth;
    const height = element.offsetHeight;

    const svg = d3
      .select(element)
      .append("svg")
      .attr("width", "100%")
      .attr("height", "100%");
    // .attr("preserveAspectRatio", "xMinYMin meet")
    // .attr("viewBox", "0 0 " + width + " " + height);1

    const title = "Total growth of capital";

    const xValue = d => d.period;
    const xAxisLabel = "Period";

    const yValue = d => d.end_val;
    const circleRadius = 6;
    const yAxisLabel = "Capital";

    const margin = { top: 50, right: 10, bottom: 60, left: 85 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const xScale = d3
      .scaleLinear()
      .domain(d3.extent(data, xValue))
      .range([0, innerWidth])
      .nice();

    const yScale = d3
      .scaleLinear()
      .domain(d3.extent(data, yValue))
      .range([innerHeight, 0])
      .nice();

    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const xAxis = d3
      .axisBottom(xScale)
      .tickSize(-innerHeight)
      .tickPadding(15);

    const yAxis = d3
      .axisLeft(yScale)
      .tickSize(-innerWidth)
      .tickPadding(15);

    const yAxisG = g.append("g").call(yAxis);
    yAxisG.selectAll(".domain").remove();

    yAxisG
      .append("text")
      .attr("class", "axis-label")
      .attr("y", -70)
      .attr("x", -innerHeight / 2)
      .attr("fill", "black")
      .attr("transform", `rotate(-90)`)
      .attr("text-anchor", "middle")
      .text(yAxisLabel);

    const xAxisG = g
      .append("g")
      .call(xAxis)
      .attr("transform", `translate(0,${innerHeight})`);

    xAxisG.select(".domain").remove();

    xAxisG
      .append("text")
      .attr("class", "axis-label")
      .attr("y", 50)
      .attr("x", innerWidth / 2)
      .attr("fill", "black")
      .text(xAxisLabel);

    const lineGenerator = d3
      .line<ChartDataResponse>()
      .x(d => xScale(xValue(d)))
      .y(d => yScale(yValue(d)))
      .curve(d3.curveBasis);

    g.append("path")
      .attr("class", "line-path")
      .attr("d", lineGenerator(data));

    g.append("text")
      .attr("class", "title")
      .attr("y", -25)
      .text(title);
  }
}
