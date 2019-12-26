import { ActionReducerMap, MetaReducer, ActionReducer } from '@ngrx/store';
import { environment } from '../../../environments/environment';
import * as fromChartData from './chart-data-request.reducer';
import * as fromChartDataResponse from './chart-data-response.reducer';

export interface State {
  [fromChartData.chartDataFeatureKey]: fromChartData.FeatureState;
  [fromChartDataResponse.chartDataResponseFeatureKey]: fromChartDataResponse.FeatureState;
}

export const reducers: ActionReducerMap<State> = {
  [fromChartData.chartDataFeatureKey]: fromChartData.reducer,
  [fromChartDataResponse.chartDataResponseFeatureKey]:
    fromChartDataResponse.reducer
};

// console.log all actions
export function debug(reducer: ActionReducer<any>): ActionReducer<any> {
  return function(state, action) {
    console.log('state', state);
    console.log('action', action);

    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? [debug]
  : [];
