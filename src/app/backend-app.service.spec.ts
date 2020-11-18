import { TestBed } from '@angular/core/testing';

import { BackendAppService } from './backend-app.service';

describe('BackendAppService', () => {
  let service: BackendAppService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BackendAppService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
