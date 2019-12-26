import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';

import { ChartDataRequest } from 'src/app/data/data.model';

@Injectable({
  providedIn: 'root'
})
export class CalculateReturnsService {
  constructor(private http: HttpClient) {}

  post(request: ChartDataRequest) {
    return this.http.post(
      `${environment.apiHost}${environment.apiUrl}`,
      request
    );
  }
}
