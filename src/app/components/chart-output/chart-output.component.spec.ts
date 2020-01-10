import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartOutputComponent } from './chart-output.component';

describe('ChartOutputComponent', () => {
  let component: ChartOutputComponent;
  let fixture: ComponentFixture<ChartOutputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartOutputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartOutputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
