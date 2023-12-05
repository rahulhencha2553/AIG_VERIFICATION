import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Status } from 'src/app/models/status';
import { VerificationRequestDetails } from 'src/app/payload/verification-request-details';
import { VerificationService } from 'src/app/services/verification.service';

@Component({
  selector: 'app-request-details',
  templateUrl: './request-details.component.html',
  styleUrls: ['./request-details.component.scss']
})
export class RequestDetailsComponent implements OnInit{

  public verificationReqDetail : VerificationRequestDetails = new VerificationRequestDetails()
  public status = Status;
  
  constructor(private activeRoute:ActivatedRoute,private verificationService:VerificationService){

  }

  ngOnInit(): void {
    this.getVerificationRequestDetails(this.activeRoute.snapshot.params['uuid']);
  }

  public getVerificationRequestDetails(uuid:string){
    this.verificationService.getVerificationRequestDetails(uuid).subscribe({
      next:(data:any)=>{
        this.verificationReqDetail = data.requestDetails
      },
      error:(err:any)=>{
        console.log(err)
      }
    })
  }

}
