import { Action, createReducer, on, createSelector } from '@ngrx/store';
import * as ChartDataActions from '../actions/chart-data.actions';

export const chartDataFeatureKey = 'chartData';

export interface FeatureState {
  startingCapitalAmount: number;
  additionAmount: number;
  numberOfPeriods: number;
}

export interface AppState {
  feature: FeatureState;
}

export const initialState: FeatureState = {
  startingCapitalAmount: null,
  additionAmount: null,
  numberOfPeriods: null
};

const chartDataReducer = createReducer(
  initialState,
  on(ChartDataActions.setChartData, (state, chartDataRequest) => ({
    ...state,
    startingCapitalAmount: chartDataRequest.startingCapitalAmount,
    additionAmount: chartDataRequest.additionAmount,
    numberOfPeriods: chartDataRequest.numberOfPeriods
  }))
);

export function reducer(state: FeatureState | undefined, action: Action) {
  return chartDataReducer(state, action);
}

export const selectFeature = (state: AppState) => state.feature;

export const selectFeatureChartData = createSelector(
  selectFeature,
  (state: FeatureState) => state
);
