import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AddressOfficer } from 'src/app/models/address-officer';
import { AddressOfficerResponse } from 'src/app/payload/address-officer-response';
import { OfficerUpdateStatus } from 'src/app/payload/officer-update-status';
import { PageRequests } from 'src/app/payload/page-requests';
import { AddressOfficerService } from 'src/app/services/address-officer.service';
import { AppUtils } from 'src/app/utils/app-utils';
import { FormValidator } from 'src/app/utils/form-validator';
import { PaginationManager } from 'src/app/utils/pagination-manager';

@Component({
  selector: 'app-address-officer',
  templateUrl: './address-officer.component.html',
  styleUrls: ['./address-officer.component.scss'],
})
export class AddressOfficerComponent implements OnInit {
  pageRequests: PageRequests = new PageRequests();
  addressOfficers: AddressOfficerResponse[] = [];
  addressOfficer: AddressOfficer = new AddressOfficer();
  imagePreview: any = 'assets/images/temp_img/profile-modal.png';
  deleteOfficerId = 0;
  addForm: FormGroup;
  editForm: FormGroup;
  index = 0;

  pageManager: PaginationManager = new PaginationManager();

  constructor(
    private addressOfficerService: AddressOfficerService,
    private fb: FormBuilder
  ) {
    this.pageRequests.pageNo = 0;
    this.pageRequests.pageSize = 8;

    this.addForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      userName: ['', Validators.required],
      password: ['', Validators.required],
      phoneNumber: ['', Validators.required],
    });
    // Validators.pattern(/^[0-9]{10}$/),

    this.editForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      userName: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    this.getAddressOfficers(this.pageRequests);
  }

  addFormValidCheck(fieldName: string, form: any) {
    return FormValidator.formValidCheck(fieldName, form);
  }

  public formSubmittion(form: any) {
    FormValidator.formSubmittion(form);
  }

  // get address officers
  public getAddressOfficers(pageRequests: PageRequests) {
    this.addressOfficerService.getAllOfficers(pageRequests).subscribe({
      next: (data: any) => {
        this.addressOfficers = data.data.content;
        this.pageManager.setPageData(data.data);
        this.pageRequests.pageNo = data.data.pageable.pageNumber;
        console.log(this.pageManager);
      },
      error: (err: any) => {
        AppUtils.openToast('error', err.error.message, 'Error');
      },
    });
  }

  // add address officer
  public addOfficer(id: string) {
    this.formSubmittion(this.addForm);
    if (this.addForm.valid) {
      this.addressOfficerService.addOfficer(this.addressOfficer).subscribe(
        (data: any) => {
          this.getAddressOfficers(this.pageRequests);
          AppUtils.modalDismiss(id);

          AppUtils.openToast('success', data.message, 'Success');
        },
        (err: any) => {
          AppUtils.openToast('error', err.error.message, 'Error');
        }
      );
    }
  }

  public clearData() {
    this.addressOfficer = new AddressOfficer();
  }

  public clearDeleteData() {
    this.deleteOfficerId = 0;
  }

  // get officer by id
  public getOfficerById(userId: any) {
    this.addressOfficerService.getAddressOfficerById(userId).subscribe({
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
    this.formSubmittion(this.editForm);
    if (this.editForm.valid)
      this.addressOfficerService.updateOfficer(this.addressOfficer).subscribe({
        next: (data: any) => {
          this.getAddressOfficers(this.pageRequests);
          AppUtils.modalDismiss(id);
          AppUtils.openToast('success', data.message, 'Success');
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

  officerUpdateStatus: OfficerUpdateStatus = new OfficerUpdateStatus();

  // update officer status
  public updateOfficerStatus(userId: any, isActive: Boolean) {
    this.officerUpdateStatus.userId = userId;
    this.officerUpdateStatus.isActive = isActive;
    this.addressOfficerService
      .updateOfficerStatus(this.officerUpdateStatus)
      .subscribe(
        (data: any) => {
          this.getAddressOfficers(this.pageRequests);

          AppUtils.openToast('success', data.message, 'Success');
        },
        (err: any) => {
          AppUtils.openToast('error', err.error.message, 'Error');
        }
      );
  }

  // setting data before confirmation
  public setDeleteData(deleteOfficerId: any) {
    this.deleteOfficerId = deleteOfficerId;
  }

  // delete officer by id
  public deleteOfficer() {
    this.addressOfficerService.deleteOfficer(this.deleteOfficerId).subscribe(
      (data: any) => {
        this.clearDeleteData();
        this.getAddressOfficers(this.pageRequests);

        AppUtils.openToast('success', data.message, 'Success');
      },
      (err: any) => {
        AppUtils.openToast('error', err.error.message, 'Error');
      }
    );
  }

  // get pages
  public getOfficersPage(pageNumber: number) {
    if (pageNumber !== this.pageRequests.pageNo) {
      this.pageRequests.pageNo = pageNumber;
      this.getAddressOfficers(this.pageRequests);
    }
  }

  manageNextPrev(isNext: boolean) {
    let i = 0;
    if (isNext) i = this.pageRequests.pageNo + 1;
    else i = this.pageRequests.pageNo - 1;
    if (i >= 0 && i < this.pageManager.totalPages) this.getOfficersPage(i);
  }

  public changePasswordIcon(element: any) {
    AppUtils.changePassowrdIcon(element);
  }

  passwordVisibilityMap = new Map<any, boolean>();

  public togglePasswordVisibility(email: any): void {
    const currentVisibility = this.passwordVisibilityMap.get(email) || false;
    this.passwordVisibilityMap.set(email, !currentVisibility);
  }

  public isPasswordVisible(email: any): boolean {
    return this.passwordVisibilityMap.get(email) || false;
  }
}
