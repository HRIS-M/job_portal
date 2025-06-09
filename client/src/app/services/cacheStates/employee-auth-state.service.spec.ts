import { TestBed } from '@angular/core/testing';

import { EmployeeAuthStateService } from './employee-auth-state.service';

describe('EmployeeAuthStateService', () => {
  let service: EmployeeAuthStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeeAuthStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
