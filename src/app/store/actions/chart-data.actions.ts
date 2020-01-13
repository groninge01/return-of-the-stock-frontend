import { createAction, props } from '@ngrx/store';
import { ChartDataResponse, ChartDataRequest } from '../../data/data.model';

export const loadChartData = createAction(
  '[ChartData] Load ChartData ',
  props<{ chartData: ChartDataRequest }>()
);

export const loadChartDataSuccess = createAction(
  '[ChartData] Load ChartData Success',
  props<{ chartData: ChartDataResponse[] }>()
);

export const loadChartDataFailure = createAction(
  '[ChartData] Load ChartData Failure',
  props<{ errorMessage: any }>()
);
