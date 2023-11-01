import { TestBed } from '@angular/core/testing';

import { ApiGetPlanDetailsService } from './api-get-plan-details.service';

describe('ApiGetPlanDetailsService', () => {
  let service: ApiGetPlanDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiGetPlanDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
