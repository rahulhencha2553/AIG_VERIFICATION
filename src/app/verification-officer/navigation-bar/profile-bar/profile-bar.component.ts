import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PortalOfficer } from 'src/app/models/portal-officer';
import { ChangePasswordRequest } from 'src/app/payload/change-password-request';
import { UpdateOfficerRequest } from 'src/app/payload/update-officer-request';
import { AuthService } from 'src/app/services/auth.service';

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
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.getOfficer();
  }

   // get officer 
  public getOfficer() {
    this.authService.officer.subscribe((data: any) => {
      this.officer = data;
      this.setOfficer();
    });
  }

  // setting officer details to update request officer
  setOfficer() {
    this.updateOffier.firstName = this.officer.firstName;
    this.updateOffier.lastName = this.officer.lastName;
    this.updateOffier.email = this.officer.email;
    this.updateOffier.phoneNumber = this.officer.phoneNumber;
    this.updateOffier.profilePicture = this.officer.profilePicture;
    this.imagePreview = this.updateOffier.profilePicture;
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
  public updatePortalOfficer() {
    this.authService.updateOfficer(this.updateOffier).subscribe(
      (data: any) => {
        this.officer = data.officer;
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
               
      })

     }else{
      alert("passowrd doesn't match");
     }
  }


  // logout officer 
  public logOut() {
    this.authService.logOut();
  }


}
