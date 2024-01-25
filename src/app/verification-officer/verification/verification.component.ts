import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Status } from 'src/app/models/status';
import { PageRequests } from 'src/app/payload/page-requests';
import { VerificationRequestsDetailsWeb } from 'src/app/payload/verification-requests-details-web';
import { DashboardService } from 'src/app/services/dashboard.service';
import { AppUtils } from 'src/app/utils/app-utils';
import { PaginationManager } from 'src/app/utils/pagination-manager';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.scss'],
})
export class VerificationComponent implements OnInit {
  public pageRequests: PageRequests = new PageRequests();
  public status = Status;
  public pageManager: PaginationManager = new PaginationManager();
  public verificationRequests: VerificationRequestsDetailsWeb[] = [];

  constructor(
    private dashBoardService: DashboardService,
    private activatedRoute: ActivatedRoute
  ) {
    this.clearData();
  }

  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe((res: any) => {
      let status = res.params.status;

      if (status === '') this.getVerificationRequests(Status.Pending);

      switch (status) {
        case 'Pending':
          AppUtils.modalDismiss('Pendings');
          break;

        case 'Verified':
          AppUtils.modalDismiss('Verifieds');
          break;

        case 'Rejected':
          AppUtils.modalDismiss('Rejecteds');
          break;

        default:
          AppUtils.modalDismiss('Pendings');
          break;
      }
    });
  }

  public getVerificationRequests(status: Status, isFromUi: boolean = false) {
    this.dashBoardService
      .getPortalOfficerByStatus(status, this.pageRequests)
      .subscribe({
        next: (data: any) => {
          this.verificationRequests = data.requests.content;
          this.pageManager.setPageData(data.requests);
          this.pageRequests.pageNo = data.requests.pageable.pageNumber;
          if (isFromUi) this.clearData();
        },
        error: (err: any) => {
          AppUtils.openToast('error', err.error.message, 'Error');
        },
      });
  }

  public manageNextPrev(isNext: boolean, status: Status) {
    let i = 0;
    if (isNext) i = this.pageRequests.pageNo + 1;
    else i = this.pageRequests.pageNo - 1;
    if (i >= 0 && i < this.pageManager.totalPages)
      this.getRequestPage(i, status);
  }

  public clearData() {
    this.pageRequests.pageNo = 0;
    this.pageRequests.pageSize = 6;
  }
  // get pages
  public getRequestPage(pageNumber: number, status: Status) {
    if (pageNumber !== this.pageRequests.pageNo) {
      this.pageRequests.pageNo = pageNumber;
      this.getVerificationRequests(status);
    }
  }
}
