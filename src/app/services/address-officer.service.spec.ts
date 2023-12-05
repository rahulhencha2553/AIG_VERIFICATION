import { TestBed } from '@angular/core/testing';

import { AddressOfficerService } from './address-officer.service';

describe('AddressOfficerService', () => {
  let service: AddressOfficerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddressOfficerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
