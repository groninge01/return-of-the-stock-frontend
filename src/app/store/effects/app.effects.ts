import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { HttpClient } from "@angular/common/http";
import { switchMap, map, withLatestFrom } from "rxjs/operators";
import { Store } from "@ngrx/store";

import { setChartData } from "../actions/chart-data.actions";
import { setChartDataResponse } from "../actions/chart-data-response.actions";
import { selectFeatureChartData } from "../reducers/chart-data-request.reducer";
import { ChartDataResponse } from "src/app/data/data.model";

@Injectable()
export class AppEffects {
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store: Store<any>
  ) {}

  setChartData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(setChartData),
      withLatestFrom(this.store.select(selectFeatureChartData)),
      switchMap(([value]) => {
        return this.http
          .post("./apitest/", {
            startingCapitalAmount: value.startingCapitalAmount,
            additionAmount: value.additionAmount,
            returnPercentage: value.returnPercentage,
            numberOfPeriods: value.numberOfPeriods,
            typeOfPeriod: value.typeOfPeriod
          })
          .pipe(
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
