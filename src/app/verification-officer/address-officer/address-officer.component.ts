import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AddressOfficer } from 'src/app/models/address-officer';
import { AddressOfficerResponse } from 'src/app/payload/address-officer-response';
import { OfficerUpdateStatus } from 'src/app/payload/officer-update-status';
import { PageRequests } from 'src/app/payload/page-requests';
import { AddressOfficerService } from 'src/app/services/address-officer.service';
import { AppUtils } from 'src/app/utils/app-utils';

@Component({
  selector: 'app-address-officer',
  templateUrl: './address-officer.component.html',
  styleUrls: ['./address-officer.component.scss']
})
export class AddressOfficerComponent implements OnInit {

  pageRequests: PageRequests = new PageRequests();
  addressOfficers: AddressOfficerResponse[] = [];
  addressOfficer: AddressOfficer = new AddressOfficer();
  imagePreview: any = 'assets/images/temp_img/profile-modal.png';
  deleteOfficerId = 0;
  addForm!: FormGroup;

  constructor(private addressOfficerService: AddressOfficerService, private fb: FormBuilder) {
    this.pageRequests.pageSize = 100;

    this.addForm = new FormGroup({
      firstName: new FormControl("", [Validators.required]),
      lastName: new FormControl("", [Validators.required]),
      email: new FormControl("", [Validators.email]),
      userName: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required]),
      phoneNumber: new FormControl("", [Validators.required, Validators.pattern(/^[0-9]{10}$/)])
    })
  }
  ngOnInit(): void {

    this.getAddressOfficers();
  }












  public firstTaskFormControl() {
    Object.keys(this.addForm.controls).forEach(key => {
      const control = this.addForm.get(key) ;
      if (control) {
        control.markAsTouched();
      }
    });
    const firstInvalidControl = document.querySelector('input.ng-invalid');
    if (firstInvalidControl) {
      firstInvalidControl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }





  // get address officers
  public  getAddressOfficers() {
    this.addressOfficerService.getAllOfficers(this.pageRequests).subscribe((data: any) => {
      console.log(data);
      this.addressOfficers = data.data.content;
    })
  }

  // add address officer
  public addOfficer() {
this.firstTaskFormControl();

      this.addressOfficerService.addOfficer(this.addressOfficer).subscribe((data: any) => {
        this.getAddressOfficers();
      })
  }

  public clearData() {
    this.addressOfficer = new AddressOfficer();
  }

  public clearDeleteData() {
    this.deleteOfficerId = 0;
  }

  // get officer by id
  public getOfficerById(userId: any) {
    this.addressOfficerService.getAddressOfficerById(userId).subscribe((data: any) => {
      this.addressOfficer = data.data;
      console.log(this.addressOfficer);
      this.imagePreview = this.addressOfficer.profilePicture
    })
  }

  // update officer

  public updateOfficer() {
    this.addressOfficerService.updateOfficer(this.addressOfficer).subscribe((data: any) => {
      this.getAddressOfficers();
    })
  }


  // setting image to officer
  public setImage(event: any) {
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

  officerUpdateStatus: OfficerUpdateStatus = new OfficerUpdateStatus();

  // update officer status
  public updateOfficerStatus(userId: any, isActive: Boolean) {
    this.officerUpdateStatus.userId = userId;
    this.officerUpdateStatus.isActive = isActive;
    this.addressOfficerService.updateOfficerStatus(this.officerUpdateStatus).subscribe((data: any) => {
      this.getAddressOfficers()
    })
  }

  // setting data before confirmation
  public setDeleteData(deleteOfficerId: any) {
    this.deleteOfficerId = deleteOfficerId;
  }

  // delete officer by id
  public deleteOfficer() {
    this.addressOfficerService.deleteOfficer(this.deleteOfficerId).subscribe((data: any) => {
      this.clearDeleteData();
      this.getAddressOfficers()
    })
  }

  public changePasswordIcon(element: any) {
    AppUtils.changePassowrdIcon(element);
  }

  check(t1: any, password: any) {
    alert("helo")

    console.log(t1);
    console.log(password);

  }

  passwordVisibilityMap = new Map<any, boolean>();

  public togglePasswordVisibility(password: any): void {
    const currentVisibility = this.passwordVisibilityMap.get(password) || false;
    this.passwordVisibilityMap.set(password, !currentVisibility);
  }

  public isPasswordVisible(password: any): boolean {
    return this.passwordVisibilityMap.get(password) || false;
  }

}
