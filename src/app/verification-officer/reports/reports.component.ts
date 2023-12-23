import { Component, OnInit } from '@angular/core';
import { AddressOfficerResponse } from 'src/app/payload/address-officer-response';
import { VerificationService } from 'src/app/services/verification.service';
import { AppUtils } from 'src/app/utils/app-utils';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
})
export class ReportsComponent implements OnInit {
  constructor(private verificationSerice: VerificationService) {}
  addressOfficers: AddressOfficerResponse[] = [];
  ngOnInit(): void {
    this.getTopVerificationOfficers();
  }

  passwordVisibilityMap = new Map<any, boolean>();

  public togglePasswordVisibility(password: any): void {
    const currentVisibility = this.passwordVisibilityMap.get(password) || false;
    this.passwordVisibilityMap.set(password, !currentVisibility);
  }

  public isPasswordVisible(password: any): boolean {
    return this.passwordVisibilityMap.get(password) || false;
  }

  getTopVerificationOfficers() {
    this.verificationSerice.topVerificationOfficers().subscribe({
      next: (data: any) => {
        this.addressOfficers = data.data;
      },
      error: (err: any) => {
        AppUtils.openToast('error', err.error.message, 'Error');
      },
    });
  }
}
