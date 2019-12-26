import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ChartDataRequest } from 'src/app/data/data.model';

@Injectable({
  providedIn: 'root'
})
export class CalculateReturnsService {
  constructor(private http: HttpClient) {}

  post(request: ChartDataRequest) {
    return this.http.post('apitest/', {
      startingCapitalAmount: request.startingCapitalAmount,
      additionAmount: request.additionAmount,
      returnPercentage: request.returnPercentage,
      numberOfPeriods: request.numberOfPeriods,
      typeOfPeriod: request.typeOfPeriod
    });
  }
}
