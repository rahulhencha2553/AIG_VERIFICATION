import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Status } from 'src/app/models/status';
import { VerificationRequestDetails } from 'src/app/payload/verification-request-details';
import { VerificationService } from 'src/app/services/verification.service';
import { AppUtils } from 'src/app/utils/app-utils';
import { MapUtils } from 'src/app/utils/map-utils';
import { PlyrComponent } from 'ngx-plyr';

import { Location as LocationObj } from '@angular/common'

declare var Plyr :any;
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

  public passwordVisibilityMap = new Map<any, boolean>();
public deleteVoiceDirectionId:any=0;

  public location = {
    lat: 22.719568,
    long: 75.857727,
    address: '',
    aigCode: '',
  };


  constructor(
    private activeRoute: ActivatedRoute,
    private verificationService: VerificationService
  ) {

  }

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
      
      },
      error: (err: any) => {
        AppUtils.openToast('error', err.error.message, 'Error');
      },
    });
  }


  
  public togglePasswordVisibility(email: any): void {
    const currentVisibility = this.passwordVisibilityMap.get(email) || false;

    this.passwordVisibilityMap.forEach((value,key)=>{
       value=false;
      
       this.passwordVisibilityMap.set(key,value);
       
    })
    this.passwordVisibilityMap.set(email, !currentVisibility);
  }

  public isPasswordVisible(email: any): boolean {
    return this.passwordVisibilityMap.get(email) || false;
  }


  public deleteVoiceDirection(){
    if(this.deleteVoiceDirectionId!=0)
    this.verificationService.deleteVoiceDirection(this.deleteVoiceDirectionId).subscribe({
      next:(data:any)=>{
        AppUtils.openToast('success', data.message, 'Success');
        this.verificationReqDetail.addressData.voiceDirections=this.verificationReqDetail.addressData.voiceDirections.filter(f=>{
         return f.uuid!=this.deleteVoiceDirectionId;
        })
        AppUtils.modalDismiss("delete-close");
        this.deleteVoiceDirectionId=0;
      },error:(err:any)=>{
        AppUtils.openToast('error', err.error.message, 'Error');
      }
    })
  }

  clearData(){
    this.deleteVoiceDirectionId=0
  }

  public deleteRouteVideo(){
    if(this.deleteVoiceDirectionId!=0)
    this.verificationService.deleteRouteVideo(this.deleteVoiceDirectionId).subscribe({
      next:(data:any)=>{
        AppUtils.openToast('success', data.message, 'Success');
        this.verificationReqDetail.addressData.routeVideo=this.verificationReqDetail.addressData.routeVideo.filter(f=>{
         return f.uuid!=this.deleteVoiceDirectionId;
        })
        AppUtils.modalDismiss("delete-close");
        this.deleteVoiceDirectionId=0;
      },error:(err:any)=>{
        AppUtils.openToast('error', err.error.message, 'Error');
      }
    })
  }

  public gotoBack(){
   window.history.back();
  }

}
