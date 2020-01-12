export interface ChartDataResponse {
  mean: number;
  min: number;
  max: number;
}

export interface ChartDataRequest {
  startingCapitalAmount: number;
  additionAmount: number;
  numberOfYears: number;
}
