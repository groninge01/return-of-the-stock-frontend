import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from '@angular/forms';
import { Store } from '@ngrx/store';

import { ChartDataRequest } from '../../data/data.model';
import { setChartData } from '../../store/actions/chart-data.actions';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  myForm: FormGroup;

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
      numberOfYears: [
        12,
        [Validators.required, Validators.min(1), Validators.max(40)]
      ]
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

  onSubmit(value: ChartDataRequest) {
    this.store.dispatch(setChartData(value));
  }
}
