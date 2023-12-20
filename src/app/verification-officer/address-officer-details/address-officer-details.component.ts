import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AddressOfficer } from 'src/app/models/address-officer';
import { Status } from 'src/app/models/status';
import { OfficerAssignedRequests } from 'src/app/payload/officer-assigned-requests';
import { VerificationRequestsDetailsWeb } from 'src/app/payload/verification-requests-details-web';
import { AddressOfficerService } from 'src/app/services/address-officer.service';
import { VerificationService } from 'src/app/services/verification.service';
import { AppUtils } from 'src/app/utils/app-utils';

@Component({
  selector: 'app-address-officer-details',
  templateUrl: './address-officer-details.component.html',
  styleUrls: ['./address-officer-details.component.scss']
})
export class AddressOfficerDetailsComponent implements OnInit {

  addressOfficer: AddressOfficer = new AddressOfficer();

  updateAddressOfficer:AddressOfficer = new AddressOfficer();
  offiserAssignedRequests:OfficerAssignedRequests=new OfficerAssignedRequests();
  verificationRequests: VerificationRequestsDetailsWeb[] = [];

  imagePreview: any ='assets/images/temp_img/profile-modal.png';
  public status=Status;
  

  constructor(private addressOfficerServie: AddressOfficerService, private activtedRoute: ActivatedRoute,private verificationService:VerificationService) { }


  ngOnInit(): void {
    this.activtedRoute.params.subscribe((p: any) => {
      let uuid = p['uuid'];
      this.offiserAssignedRequests.id=uuid;
      this.getOfficerById(uuid);
     this.OfficerAssignedRequests();
    })
  }

  getOfficerById(uuid: any) {
    this.addressOfficerServie.getAddressOfficerById(uuid).subscribe((data: any) => {
      console.log(data);
      this.addressOfficer = data.data;
        this.imagePreview=this.addressOfficer.profilePicture;
    })
  }

 // update officer

 updateOfficer(id:string) {
  this.addressOfficerServie.updateOfficer(this.addressOfficer).subscribe((data: any) => {
    this.getOfficerById(data.data.userId)
    AppUtils.modalDismiss(id);
  })
}

// get officer assigned requests
public OfficerAssignedRequests(status:Status=Status.Pending){
  this.offiserAssignedRequests.status=status;
  this.verificationService.officerAssignedRequests(this.offiserAssignedRequests).subscribe((data:any)=>{
          this.verificationRequests = data.requests.content;
          console.log(data);
          
  })
}

  // setting image to officer
  setImage(event: any) {
    this.addressOfficer.profilePicture = event.target.files[0];
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagePreview = e.target.result;
      };
      reader.readAsDataURL(selectedFile);
    }
  }



  manageEditModel(value:boolean){
    if(value){
      document.getElementById("btn1")!.style.display = "none";
      document.getElementById("btn2")!.style.display = "block";
    }else{
      document.getElementById("btn2")!.style.display = "none";
      document.getElementById("btn1")!.style.display = "block";
    }
  }

}
