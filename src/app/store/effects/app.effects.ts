import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';

import * as fromChartDataActions from '../actions/chart-data.actions';
import { ChartDataResponse } from 'src/app/data/data.model';
import { CalculateReturnsService } from 'src/app/services/calculate-returns.service';

@Injectable()
export class AppEffects {
  constructor(
    private actions$: Actions,
    private calculateReturnsService: CalculateReturnsService
  ) {}

  setChartData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromChartDataActions.loadChartData),
      switchMap(action => {
        return this.calculateReturnsService.post(action.chartData).pipe(
          map((chartData: ChartDataResponse[]) =>
            fromChartDataActions.loadChartDataSuccess({
              chartData
            })
          ),
          catchError(error =>
            of(
              fromChartDataActions.loadChartDataFailure({
                errorMessage: error.message
              })
            )
          )
        );
      })
    )
  );
}
