export interface Period {
  value: string;
}

export interface ChartDataResponse {
  period: number;
  beg_val: number;
  deposit: number;
  ret: number;
  end_val: number;
}

export interface ChartDataRequest {
  startingCapitalAmount: number;
  additionAmount: number;
  returnPercentage: number;
  numberOfPeriods: number;
  typeOfPeriod: string;
}
