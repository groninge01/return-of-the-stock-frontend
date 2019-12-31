export interface ChartDataResponse {
  years: number;
  mean: number;
  min: number;
  max: number;
}

export interface ChartDataRequest {
  startingCapitalAmount: number;
  additionAmount: number;
  numberOfPeriods: number;
}
