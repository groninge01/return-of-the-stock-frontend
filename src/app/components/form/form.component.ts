import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';

import { Period, ChartDataRequest } from '../../data/data.model';
import { setChartData } from '../../store/actions/chart-data.actions';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  myForm: FormGroup;
  periods: Period[] = [{ value: 'Month' }, { value: 'Year' }];

  constructor(private fb: FormBuilder, private store: Store<any>) {}

  ngOnInit() {
    this.myForm = this.fb.group({
      startingCapitalAmount: [15000],
      additionAmount: [1000],
      numberOfPeriods: [144],
      typeOfPeriod: ['Month']
    });
  }

  onSubmit(value: ChartDataRequest) {
    this.store.dispatch(setChartData(value));
  }
}
