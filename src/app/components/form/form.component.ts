import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { ChartDataRequest } from '../../data/data.model';
import { loadChartData } from '../../store/actions/chart-data.actions';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  myForm: FormGroup;
  chartData: ChartDataRequest;

  constructor(private fb: FormBuilder, private store: Store<any>) {}

  ngOnInit() {
    this.myForm = this.fb.group({
      startingCapitalAmount: [
        17000,
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

    this.onChanges();
  }

  onChanges() {
    const formFieldArray = [
      this.myForm.controls.startingCapitalAmount.valueChanges,
      this.myForm.controls.additionAmount.valueChanges,
      this.myForm.controls.numberOfYears.valueChanges
    ];

    combineLatest(formFieldArray)
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe(() => {
        if (this.myForm.valid) {
          this.chartData = {
            startingCapitalAmount: this.myForm.controls.startingCapitalAmount
              .value,
            additionAmount: this.myForm.controls.additionAmount.value,
            numberOfYears: this.myForm.controls.numberOfYears.value
          };
          this.store.dispatch(loadChartData({ chartData: this.chartData }));
        }
      });

    this.myForm.controls.startingCapitalAmount.updateValueAndValidity({
      emitEvent: true
    });
    this.myForm.controls.additionAmount.updateValueAndValidity({
      emitEvent: true
    });
    this.myForm.controls.numberOfYears.updateValueAndValidity({
      emitEvent: true
    });
  }

  getErrorMessage(control: AbstractControl): string {
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
}
