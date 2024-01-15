import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Status } from 'src/app/models/status';
import { VerificationRequestDetails } from 'src/app/payload/verification-request-details';
import { VerificationService } from 'src/app/services/verification.service';
import { AppUtils } from 'src/app/utils/app-utils';
import { MapUtils } from 'src/app/utils/map-utils';
declare var google: any;
@Component({
  selector: 'app-request-details',
  templateUrl: './request-details.component.html',
  styleUrls: ['./request-details.component.scss'],
})
export class RequestDetailsComponent implements OnInit {
  public verificationReqDetail: VerificationRequestDetails =
    new VerificationRequestDetails();
  public status = Status;
  private mapUtils: MapUtils = new MapUtils();

  public location = {
    lat: 22.719568,
    long: 75.857727,
    address: '',
    aigCode: '',
  };

  constructor(
    private activeRoute: ActivatedRoute,
    private verificationService: VerificationService
  ) {}

  ngOnInit(): void {
    this.getVerificationRequestDetails(
      this.activeRoute.snapshot.params['uuid']
    );
  }

  public getVerificationRequestDetails(uuid: string) {
    this.verificationService.getVerificationRequestDetails(uuid).subscribe({
      next: (data: any) => {
        this.verificationReqDetail = data.requestDetails;
        let element = document.getElementById('map');

        (this.location.address =
          this.verificationReqDetail.addressData.address),
          (this.location.aigCode =
            this.verificationReqDetail.addressData.aigCode);

        this.mapUtils.initMap(element, this.location);
        console.log(data);
      },
      error: (err: any) => {
        AppUtils.openToast('error', err.error.message, 'Error');
      },
    });
  }
}
