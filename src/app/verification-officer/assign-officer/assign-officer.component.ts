import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AddressOfficerResponse } from 'src/app/payload/address-officer-response';
import { PageRequests } from 'src/app/payload/page-requests';
import { ReAssingOfficerRequest } from 'src/app/payload/re-assing-officer-request';
import { VerificationService } from 'src/app/services/verification.service';
import { AppUtils } from 'src/app/utils/app-utils';
import { PaginationManager } from 'src/app/utils/pagination-manager';

@Component({
  selector: 'app-assign-officer',
  templateUrl: './assign-officer.component.html',
  styleUrls: ['./assign-officer.component.scss'],
})
export class AssignOfficerComponent implements OnInit {
  public pageManager: PaginationManager = new PaginationManager();
  public addressOfficers: AddressOfficerResponse[] = [];
  public pageRequest: PageRequests = new PageRequests();
  public assignedOfficerId: any;
  public requestId: any;
  public reAssingRequest = new ReAssingOfficerRequest();

  constructor(
    private verificationService: VerificationService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.assignedOfficerId = this.activatedRoute.snapshot.params['officerId'];
    this.requestId = this.activatedRoute.snapshot.params['requesId'];
    if (this.assignedOfficerId != undefined || this.assignedOfficerId != null)
      this.getActiveVerificationOfficers(this.assignedOfficerId);
  }

  public getActiveVerificationOfficers(officerId: any) {
    this.verificationService
      .activeVerificationOfficer(officerId, this.pageRequest)
      .subscribe({
        next: (data: any) => {
          this.addressOfficers = data.data.content;
          this.pageManager.setPageData(data.data);
          this.pageRequest.pageNo = data.data.pageable.pageNumber;
          console.log(data);
        },
        error: (err: any) => {
          AppUtils.openToast('error', err.error.message, 'Error');
        },
      });
  }

  public getOfficersPage(pageNumber: number) {
    if (pageNumber !== this.pageRequest.pageNo) {
      this.pageRequest.pageNo = pageNumber;
      this.getActiveVerificationOfficers(this.assignedOfficerId);
    }
  }

  public manageNextPrev(isNext: boolean) {
    let i = 0;
    if (isNext) i = this.pageRequest.pageNo + 1;
    else i = this.pageRequest.pageNo - 1;
    if (i >= 0 && i < this.pageManager.totalPages) this.getOfficersPage(i);
  }

  public setOfficerId(officerId: any) {
    this.reAssingRequest.officerId = officerId;
  }

  public reAssignOfficer() {
    this.reAssingRequest.addressRequestId = this.requestId;

    if (this.requestId != undefined || this.requestId != null)
      this.verificationService.reAssignOfficer(this.reAssingRequest).subscribe({
        next: (data: any) => {
          AppUtils.openToast('success', data.message, 'success');
          AppUtils.modalDismiss('close');
        },
        error: (err: any) => {
          AppUtils.openToast('error', err.error.message, 'Error');
        },
      });
  }
}
