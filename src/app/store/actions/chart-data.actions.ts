import { createAction, props } from '@ngrx/store';
import { ChartDataRequest } from '../../data/data.model';

export const loadChartData = createAction('[ChartDataRequest] Load ChartData');

export const setChartData = createAction(
  '[ChartDataRequest] Set ChartData',
  props<ChartDataRequest>()
);
