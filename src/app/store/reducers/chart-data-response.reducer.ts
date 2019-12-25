import { Action, createReducer, on, createSelector } from "@ngrx/store";
import * as ChartDataResponseActions from "../actions/chart-data-response.actions";
import { ChartDataResponse } from "../../data/data.model";

export const chartDataResponseFeatureKey = "chartDataResponse";

export interface FeatureState {
  chartDataResponses: ChartDataResponse[];
}

export interface AppState {
  feature: FeatureState;
}

export const initialState: FeatureState = {
  chartDataResponses: []
};

const chartDataResponseReducer = createReducer(
  initialState,
  on(
    ChartDataResponseActions.setChartDataResponse,
    (state, { chartDataResponses }) => ({
      ...state,
      chartDataResponses
    })
  )
);

export function reducer(state: FeatureState | undefined, action: Action) {
  return chartDataResponseReducer(state, action);
}

export const selectFeature = (state: AppState) => state.feature;

export const selectFeatureChartDataResponse = createSelector(
  selectFeature,
  (state: FeatureState) => state.chartDataResponses
);
