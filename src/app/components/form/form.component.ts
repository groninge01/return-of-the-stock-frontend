import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from '@angular/forms';
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
  periods: Period[] = [
    { viewValue: 'Monthly', value: 'Month' },
    { viewValue: 'Annually', value: 'Year' }
  ];

  constructor(private fb: FormBuilder, private store: Store<any>) {}

  ngOnInit() {
    this.myForm = this.fb.group({
      startingCapitalAmount: [
        15000,
        [Validators.required, Validators.min(0), Validators.max(1000000)]
      ],
      additionAmount: [
        1000,
        [Validators.required, Validators.min(0), Validators.max(100000)]
      ],
      numberOfPeriods: [
        144,
        [Validators.required, Validators.min(0), Validators.max(1000)]
      ],
      typeOfPeriod: ['Month', [Validators.required]]
    });
  }

  getErrorMessage(control: FormControl): string {
    if (control) {
      if (control.hasError('required'))
        return 'This field is required and cannot be empty!';
      if (control.hasError('min'))
        return `Input should be >= ${control.errors.min.min}!`;
      if (control.hasError('max'))
        return `Input should be <= ${control.errors.max.max}!`;
    }
    return '';
  }

  get getContributionTypeString() {
    let contributionTypeString: string;
    switch (this.myForm.controls.typeOfPeriod.value) {
      case 'Month':
        contributionTypeString = 'Monthly';
        break;
      case 'Year':
        contributionTypeString = 'Annual';
        break;
    }
    return contributionTypeString;
  }

  onSubmit(value: ChartDataRequest) {
    this.store.dispatch(setChartData(value));
  }
}
