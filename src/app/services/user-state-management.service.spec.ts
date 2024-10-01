import { TestBed } from '@angular/core/testing';

import { UserStateManagementService } from './user-state-management.service';

describe('UserStateManagementService', () => {
  let service: UserStateManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserStateManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
