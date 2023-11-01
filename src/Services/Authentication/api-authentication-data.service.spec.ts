import { TestBed } from '@angular/core/testing';

import { ApiAuthenticationDataService } from './api-authentication-data.service';

describe('ApiAuthenticationDataService', () => {
  let service: ApiAuthenticationDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiAuthenticationDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
