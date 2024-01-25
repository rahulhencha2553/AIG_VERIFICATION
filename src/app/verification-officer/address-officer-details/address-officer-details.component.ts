import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AddressOfficer } from 'src/app/models/address-officer';
import { Status } from 'src/app/models/status';
import { OfficerAssignedRequests } from 'src/app/payload/officer-assigned-requests';
import { VerificationRequestsDetailsWeb } from 'src/app/payload/verification-requests-details-web';
import { AddressOfficerService } from 'src/app/services/address-officer.service';
import { VerificationService } from 'src/app/services/verification.service';
import { AppUtils } from 'src/app/utils/app-utils';
import { FormValidator } from 'src/app/utils/form-validator';

@Component({
  selector: 'app-address-officer-details',
  templateUrl: './address-officer-details.component.html',
  styleUrls: ['./address-officer-details.component.scss'],
})
export class AddressOfficerDetailsComponent implements OnInit {
  public addressOfficer: AddressOfficer = new AddressOfficer();

  public updateAddressOfficer: AddressOfficer = new AddressOfficer();
  public offiserAssignedRequests: OfficerAssignedRequests =
    new OfficerAssignedRequests();
  public verificationRequests: VerificationRequestsDetailsWeb[] = [];

  public imagePreview: any = 'assets/images/temp_img/profile-modal.png';
  public status = Status;
  public editForm: FormGroup;

  constructor(
    private addressOfficerServie: AddressOfficerService,
    private activtedRoute: ActivatedRoute,
    private verificationService: VerificationService,
    private fb: FormBuilder
  ) {
    this.editForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.activtedRoute.params.subscribe((p: any) => {
      let uuid = p['uuid'];
      this.offiserAssignedRequests.id = uuid;
      this.getOfficerById(uuid);
      this.OfficerAssignedRequests();
    });
  }

  public editFormValidationCheck(fieldName: string, form: any) {
    return FormValidator.formValidCheck(fieldName, form);
  }

  public formSubmittionCheck(form: any) {
    FormValidator.formSubmittion(form);
  }

  public getOfficerById(uuid: any) {
    this.addressOfficerServie.getAddressOfficerById(uuid).subscribe({
      next: (data: any) => {
        this.addressOfficer = data.data;
        this.imagePreview = this.addressOfficer.profilePicture;
      },
      error: (err: any) => {
        AppUtils.openToast('error', err.error.message, 'Error');
      },
    });
  }

  // update officer

  public updateOfficer(id: string) {
    this.formSubmittionCheck(this.editForm);

    if (this.editForm.valid)
      this.addressOfficerServie.updateOfficer(this.addressOfficer).subscribe(
        (data: any) => {
          this.getOfficerById(data.data.userId);
          AppUtils.modalDismiss(id);

          AppUtils.openToast('success', data.message, 'Success');
        },
        (err: any) => {
          AppUtils.openToast('error', err.error.message, 'Error');
        }
      );
  }

  // get officer assigned requests
  public OfficerAssignedRequests(status: Status = Status.Pending) {
    this.offiserAssignedRequests.status = status;
    this.verificationService
      .officerAssignedRequests(this.offiserAssignedRequests)
      .subscribe({
        next: (data: any) => {
          this.verificationRequests = data.requests.content;
        },
        error: (err: any) => {
          AppUtils.openToast('error', err.error.message, 'Error');
        },
      });
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

  public manageEditModel(value: boolean) {
    if (value) {
      document.getElementById('btn1')!.style.display = 'none';
      document.getElementById('btn2')!.style.display = 'block';
    } else {
      document.getElementById('btn2')!.style.display = 'none';
      document.getElementById('btn1')!.style.display = 'block';
    }
  }
}
