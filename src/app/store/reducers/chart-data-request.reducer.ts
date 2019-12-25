import { Action, createReducer, on, createSelector } from "@ngrx/store";
import * as ChartDataActions from "../actions/chart-data.actions";

export const chartDataFeatureKey = "chartData";

export interface FeatureState {
  startingCapitalAmount: number;
  additionAmount: number;
  returnPercentage: number;
  numberOfPeriods: number;
  typeOfPeriod: string;
}

export interface AppState {
  feature: FeatureState;
}

export const initialState: FeatureState = {
  startingCapitalAmount: null,
  additionAmount: null,
  returnPercentage: null,
  numberOfPeriods: null,
  typeOfPeriod: null
};

const chartDataReducer = createReducer(
  initialState,
  on(ChartDataActions.setChartData, (state, chartDataRequest) => ({
    ...state,
    startingCapitalAmount: chartDataRequest.startingCapitalAmount,
    additionAmount: chartDataRequest.additionAmount,
    returnPercentage: chartDataRequest.returnPercentage,
    numberOfPeriods: chartDataRequest.numberOfPeriods,
    typeOfPeriod: chartDataRequest.typeOfPeriod
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
