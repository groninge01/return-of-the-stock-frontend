import { createAction, props } from '@ngrx/store';
import { ChartDataResponse } from '../../data/data.model';

export const loadChartDataResponse = createAction(
  '[ChartDataResponse] Load ChartDataResponse'
);

export const setChartDataResponse = createAction(
  '[ChartDataResponse] Set ChartDataResponse',
  props<{ chartDataResponses: ChartDataResponse[] }>()
);
