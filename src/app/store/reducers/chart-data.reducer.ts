import { Action, createReducer, on, createSelector } from '@ngrx/store';
import * as ChartDataActions from '../actions/chart-data.actions';
import { ChartDataResponse } from '../../data/data.model';

export const chartDataFeatureKey = 'chartData';

export interface FeatureState {
  isLoading: boolean;
  errorMessage: any;
  chartData: ChartDataResponse[];
}

export interface AppState {
  feature: FeatureState;
}

export const initialState: FeatureState = {
  isLoading: false,
  errorMessage: null,
  chartData: []
};

const chartDataReducer = createReducer(
  initialState,
  on(ChartDataActions.loadChartData, state => ({
    ...state,
    isLoading: true,
    errorMessage: null
  })),
  on(ChartDataActions.loadChartDataSuccess, (state, { chartData }) => ({
    ...state,
    isLoading: false,
    errorMessage: null,
    chartData
  })),
  on(ChartDataActions.loadChartDataFailure, (state, { errorMessage }) => ({
    ...state,
    isLoading: false,
    errorMessage: errorMessage
  }))
);

export function reducer(state: FeatureState | undefined, action: Action) {
  return chartDataReducer(state, action);
}

export const selectFeature = (state: AppState) => state.feature;

export const selectFeatureChartData = createSelector(
  selectFeature,
  (state: FeatureState) => state.chartData
);
