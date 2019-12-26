import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { distinctUntilChanged } from 'rxjs/operators';

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

  constructor(private store: Store<any>) {}

  ngOnInit() {
    // this.store
    //   .select(state => state.feature.chartDataResponses)
    //   .pipe(distinctUntilChanged())
    //   .subscribe(data => (this.data = data));
    this.store
      .pipe(distinctUntilChanged())
      .subscribe(
        data => (this.data = data.chartDataResponse.chartDataResponses)
      );
  }
}
