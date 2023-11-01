import { TestBed } from '@angular/core/testing';

import { ApiAuthenticationStorageService } from './api-authentication-storage.service';

describe('ApiAuthenticationStorageService', () => {
  let service: ApiAuthenticationStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiAuthenticationStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
