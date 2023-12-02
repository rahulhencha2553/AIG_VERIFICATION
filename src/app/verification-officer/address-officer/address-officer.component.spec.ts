import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressOfficerComponent } from './address-officer.component';

describe('AddressOfficerComponent', () => {
  let component: AddressOfficerComponent;
  let fixture: ComponentFixture<AddressOfficerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddressOfficerComponent]
    });
    fixture = TestBed.createComponent(AddressOfficerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
