import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, withLatestFrom } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { setChartData } from '../actions/chart-data.actions';
import { setChartDataResponse } from '../actions/chart-data-response.actions';
import { selectFeatureChartData } from '../reducers/chart-data-request.reducer';
import { ChartDataResponse } from 'src/app/data/data.model';
import { CalculateReturnsService } from 'src/app/services/calculate-returns.service';

@Injectable()
export class AppEffects {
  constructor(
    private actions$: Actions,
    private store: Store<any>,
    private calculateReturnsService: CalculateReturnsService
  ) {}

  setChartData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(setChartData),
      withLatestFrom(this.store.select(selectFeatureChartData)),
      switchMap(([request]) => {
        return this.calculateReturnsService.post(request).pipe(
          map((chartDataResponses: ChartDataResponse[]) =>
            setChartDataResponse({
              chartDataResponses
            })
          )
        );
      })
    )
  );
}
