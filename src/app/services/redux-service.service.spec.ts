import { TestBed } from '@angular/core/testing';

import { ReduxServiceService } from './redux-service.service';

describe('ReduxServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReduxServiceService = TestBed.get(ReduxServiceService);
    expect(service).toBeTruthy();
  });
});
