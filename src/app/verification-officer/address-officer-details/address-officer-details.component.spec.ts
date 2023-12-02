import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressOfficerDetailsComponent } from './address-officer-details.component';

describe('AddressOfficerDetailsComponent', () => {
  let component: AddressOfficerDetailsComponent;
  let fixture: ComponentFixture<AddressOfficerDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddressOfficerDetailsComponent]
    });
    fixture = TestBed.createComponent(AddressOfficerDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
