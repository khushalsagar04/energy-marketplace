import { TestBed } from '@angular/core/testing';

import { ApiGetUserIDService } from './api-get-user-id.service';

describe('ApiGetUserIDService', () => {
  let service: ApiGetUserIDService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiGetUserIDService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
