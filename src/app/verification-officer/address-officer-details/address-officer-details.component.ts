import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AddressOfficer } from 'src/app/models/address-officer';
import { AddressOfficerService } from 'src/app/services/address-officer.service';

@Component({
  selector: 'app-address-officer-details',
  templateUrl: './address-officer-details.component.html',
  styleUrls: ['./address-officer-details.component.scss']
})
export class AddressOfficerDetailsComponent implements OnInit {

  addressOfficer: AddressOfficer = new AddressOfficer();

  updateAddressOfficer:AddressOfficer = new AddressOfficer();
  imagePreview: any ='assets/images/temp_img/profile-modal.png';

  constructor(private addressOfficerServie: AddressOfficerService, private activtedRoute: ActivatedRoute) { }


  ngOnInit(): void {
    this.activtedRoute.params.subscribe((p: any) => {
      let uuid = p['uuid'];
      this.getOfficerById(uuid);
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

 updateOfficer() {
  this.addressOfficerServie.updateOfficer(this.addressOfficer).subscribe((data: any) => {
    this.getOfficerById(data.data.userId)
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

}
