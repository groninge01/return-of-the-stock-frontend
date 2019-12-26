import { TestBed } from '@angular/core/testing';

import { CalculateReturnsService } from './calculate-returns.service';

describe('CalculateReturnsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CalculateReturnsService = TestBed.get(
      CalculateReturnsService
    );
    expect(service).toBeTruthy();
  });
});
