export interface Period {
  value: string;
}

export interface ChartDataResponse {
  period: number;
  avg: number;
  min: number;
  max: number;
}

export interface ChartDataRequest {
  startingCapitalAmount: number;
  additionAmount: number;
  numberOfPeriods: number;
  typeOfPeriod: string;
}
