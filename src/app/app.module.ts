import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AppEffects } from './store/effects/app.effects';
import { reducers, metaReducers } from './store/reducers';

import { MaterialModule } from './material/material.module';

import { AppComponent } from './app.component';
import { LineChartComponent } from './components/line-chart/line-chart.component';
import { FormComponent } from './components/form/form.component';

import { CalculateReturnsService } from 'src/app/services/calculate-returns.service';

import { environment } from '../environments/environment';

@NgModule({
  declarations: [AppComponent, LineChartComponent, FormComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true
      }
    }),
    EffectsModule.forRoot([AppEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production
    })
  ],
  providers: [CalculateReturnsService],
  bootstrap: [AppComponent]
})
export class AppModule {}
