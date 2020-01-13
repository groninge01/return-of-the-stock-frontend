import { ActionReducerMap, MetaReducer, ActionReducer } from '@ngrx/store';
import { environment } from '../../../environments/environment';
import * as fromChartData from './chart-data.reducer';

export interface State {
  chartData: fromChartData.FeatureState;
}

export const reducers: ActionReducerMap<State> = {
  chartData: fromChartData.reducer
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
