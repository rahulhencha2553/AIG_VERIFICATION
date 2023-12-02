import { Component, OnInit } from '@angular/core';
import { Status } from 'src/app/models/status';
import { PageRequests } from 'src/app/payload/page-requests';
import { VerificationRequestsDetailsWeb } from 'src/app/payload/verification-requests-details-web';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.scss'],
})
export class VerificationComponent implements OnInit {
  public pageRequests: PageRequests = new PageRequests();
  public status = Status;

  verificationRequests: VerificationRequestsDetailsWeb[] = [];

  constructor(private dashBoardService: DashboardService) {}

  ngOnInit(): void {
    this.getVerificationRequests(Status.Pending);
  }

  public getVerificationRequests(status: Status) {
    this.dashBoardService
      .getPortalOfficerByStatus(status, this.pageRequests)
      .subscribe({
        next: (data: any) => {
          this.verificationRequests = data.requests.content;
        },
        error: (err: any) => {
          console.log(err);
        },
      });
  }
}
