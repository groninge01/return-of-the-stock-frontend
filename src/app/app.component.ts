import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { distinctUntilChanged, debounceTime } from 'rxjs/operators';

import { ChartDataResponse } from './data/data.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  data: ChartDataResponse[];
  loading: boolean;

  constructor(private store: Store<any>) {}

  ngOnInit() {
    this.store
      .pipe(distinctUntilChanged(), debounceTime(1000))
      .subscribe(data => {
        this.data = data.chartData.chartData;
        this.loading = data.chartData.isLoading;
      });
  }
}
