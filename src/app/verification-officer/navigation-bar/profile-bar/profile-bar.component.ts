import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { PortalOfficer } from 'src/app/models/portal-officer';
import { ChangePasswordRequest } from 'src/app/payload/change-password-request';
import { UpdateOfficerRequest } from 'src/app/payload/update-officer-request';
import { AuthService } from 'src/app/services/auth.service';
import { AppUtils } from 'src/app/utils/app-utils';
import {
  FormValidator,
  passwordConfirmationValidator,
} from 'src/app/utils/form-validator';

@Component({
  selector: 'app-profile-bar',
  templateUrl: './profile-bar.component.html',
  styleUrls: ['./profile-bar.component.scss'],
})
export class ProfileBarComponent implements OnInit {
  public officer: PortalOfficer = new PortalOfficer();
  public updateOffier: UpdateOfficerRequest = new UpdateOfficerRequest();
  public imagePreview: string = '';
  public changePasswordRequest: ChangePasswordRequest =
    new ChangePasswordRequest();
  public confirmPassword: string = '';
  @ViewChild('i1', { static: true }) icon1!: ElementRef;
  public editForm!: FormGroup;
  public changePasswordForm: FormGroup;
  public iconClass = 'fi fi-rr-eye eye_icon';

  constructor(
    private authService: AuthService,
    private router: Router,
    private builder: FormBuilder
  ) {
    this.editForm = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
    });

    this.changePasswordForm = this.builder.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.getOfficer();
  }

  // public firstTaskFormControl() {
  //   Object.keys(this.editForm.controls).forEach((key) => {
  //     const control = this.editForm.get(key);
  //     if (control) {
  //       control.markAsTouched();
  //     }
  //   });
  //   const firstInvalidControl = document.querySelector('input.ng-invalid');
  //   if (firstInvalidControl) {
  //     firstInvalidControl.scrollIntoView({
  //       behavior: 'smooth',
  //       block: 'center',
  //     });
  //   }
  // }

  // get officer
  public getOfficer() {
    this.authService.officer.subscribe((data: any) => {
      this.officer = data;
      this.setOfficer();
    });
  }

  // setting officer details to update request officer
  public setOfficer() {
    if (this.officer) {
      this.updateOffier.firstName = this.officer.firstName;
      this.updateOffier.lastName = this.officer.lastName;
      this.updateOffier.email = this.officer.email;
      this.updateOffier.phoneNumber = this.officer.phoneNumber;
      this.updateOffier.profilePicture = this.officer.profilePicture;
      this.imagePreview = this.updateOffier.profilePicture;
    }
  }

  // setting image to officer
  public setImage(event: any) {
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
  public updatePortalOfficer(id: string) {
    //this.firstTaskFormControl();
    FormValidator.formSubmittion(this.editForm);
    if (this.editForm.valid)
      this.authService.updateOfficer(this.updateOffier).subscribe(
        (data: any) => {
          this.officer = data.officer;
          this.authService.portalOfficer.next(this.officer);
          AppUtils.modalDismiss(id);

          AppUtils.openToast('success', data.message, 'Success');
        },
        (err: any) => {
          AppUtils.openToast('error', err.error.message, 'Error');
        }
      );
  }

  // change password
  public changePassword(id: any) {
    FormValidator.formSubmittion(this.changePasswordForm);
    if (this.changePasswordForm.valid) {
      if (this.changePasswordRequest.newPassword === this.confirmPassword) {
        this.authService.changePassword(this.changePasswordRequest).subscribe(
          (data: any) => {
            AppUtils.modalDismiss(id);
            AppUtils.openToast('success', data.message, 'Success');
            this.clearData();
          },
          (err: any) => {
            AppUtils.openToast('error', err.error.message, 'Error');
          }
        );
      } else {
        AppUtils.openToast('error', "passowrd doesn't match", 'Error');
      }
    }
  }

  public clearData() {
    this.changePasswordRequest.currentPassword = '';
    this.changePasswordRequest.newPassword = '';
    this.confirmPassword = '';
    this.setOfficer();
    this.changePasswordForm.reset();
  }

  // logout officer
  public logOut() {
    this.authService.logOut();
  }

  public changePasswordIcon(element: any) {
    AppUtils.changePassowrdIcon(element);
  }

  public isFieldInvalid(field: any, form: any) {
    return FormValidator.formValidCheck(field, form);
  }

  public clearAllValidationFrom() {}
}
