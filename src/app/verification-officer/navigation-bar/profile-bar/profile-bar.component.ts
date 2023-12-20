import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PortalOfficer } from 'src/app/models/portal-officer';
import { ChangePasswordRequest } from 'src/app/payload/change-password-request';
import { UpdateOfficerRequest } from 'src/app/payload/update-officer-request';
import { AuthService } from 'src/app/services/auth.service';
import { AppUtils } from 'src/app/utils/app-utils';

@Component({
  selector: 'app-profile-bar',
  templateUrl: './profile-bar.component.html',
  styleUrls: ['./profile-bar.component.scss'],
})
export class ProfileBarComponent implements OnInit {

  officer: PortalOfficer = new PortalOfficer();
  updateOffier: UpdateOfficerRequest = new UpdateOfficerRequest();
  imagePreview: string = '';
  changePasswordRequest:ChangePasswordRequest = new ChangePasswordRequest();
  confirmPassword:string='';
  @ViewChild('i1', { static: true }) icon1!: ElementRef;
  editForm!: FormGroup;

  constructor(private authService: AuthService, private router: Router,
  ) {
    this.editForm = new FormGroup({
      firstName: new FormControl("", [Validators.required]),
      lastName: new FormControl("", [Validators.required])
    })

  }


  


  public firstTaskFormControl() {
    Object.keys(this.editForm.controls).forEach(key => {
      const control = this.editForm.get(key) ;
      if (control) {
        control.markAsTouched();
      }
    });
    const firstInvalidControl = document.querySelector('input.ng-invalid');
    if (firstInvalidControl) {
      firstInvalidControl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }



  ngOnInit(): void {
    this.getOfficer();
  }

  iconClass='fi fi-rr-eye eye_icon';

   // get officer 
  public getOfficer() {
    this.authService.officer.subscribe((data: any) => {
      this.officer = data;
      this.setOfficer();
    });
  }

  // setting officer details to update request officer
  setOfficer() {
    if(this.officer){
    this.updateOffier.firstName = this.officer.firstName;
    this.updateOffier.lastName = this.officer.lastName;
    this.updateOffier.email = this.officer.email;
    this.updateOffier.phoneNumber = this.officer.phoneNumber;
    this.updateOffier.profilePicture = this.officer.profilePicture;
    this.imagePreview = this.updateOffier.profilePicture;
    }
  }

  // setting image to officer
  setImage(event: any) {
    this.updateOffier.profilePicture = event.target.files[0];
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagePreview = e.target.result;
      };
      reader.readAsDataURL(selectedFile);
    }
  }

  // update officer
  public updatePortalOfficer(id:string) {
    this.firstTaskFormControl();
  if(this.editForm.valid )
    this.authService.updateOfficer(this.updateOffier).subscribe(
      (data: any) => {
        this.officer = data.officer;
        this.authService.portalOfficer.next(this.officer);
        AppUtils.modalDismiss(id);
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  // change password
  changePassord(){
     if(this.changePasswordRequest.newPassword===this.confirmPassword){
            
      this.authService.changePassword(this.changePasswordRequest).subscribe((data:any)=>{
        this.clearData();
      })

     }else{
      alert("passowrd doesn't match");
     }
  }

  clearData(){
    this.changePasswordRequest.currentPassword = '';
    this.changePasswordRequest.newPassword = '';

    this.confirmPassword='';
   this.setOfficer();
  }

  // logout officer 
  public logOut() {
    this.authService.logOut();
  }

 changePasswordIcon(element:any){
   AppUtils.changePassowrdIcon(element);
 }

}
