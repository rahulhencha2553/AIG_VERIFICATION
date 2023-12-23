import { Component, OnChanges, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthRequest } from 'src/app/payload/auth-request';
import { ForgetPasswordRequest } from 'src/app/payload/forget-password-request';
import { AuthService } from 'src/app/services/auth.service';
import { AppUtils } from 'src/app/utils/app-utils';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [AppUtils],
})
export class LoginComponent implements OnInit {
  authRequest: AuthRequest = new AuthRequest();
  loginForm: FormGroup;
  otpForm: FormGroup ;
  passwordForm:FormGroup;

  isValid = false;
  submitted = false;
  forgetPasswordRequest: ForgetPasswordRequest = new ForgetPasswordRequest();

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private appUtils: AppUtils,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      userId: ['', Validators.required],
      password: ['', Validators.required],
    });

    this.otpForm = this.formBuilder.group({
      otp1: ['', Validators.required],
      otp2: ['', Validators.required],
      otp3: ['', Validators.required],
      otp4: ['', Validators.required],
    });

    this.passwordForm = this.formBuilder.group({
      newPassword: ['',Validators.required],
      confimPassword: ['',Validators.required]
    })
  }
  ngOnInit(): void {
    this.otpModelManger();
    this.checkIsAlreadyLoggedIn();
  }

  otp1 = '';
  otp2 = '';
  otp3 = '';
  otp4 = '';
  confimPassword = '';

  // send to dashobard if didn't logout
  checkIsAlreadyLoggedIn() {
    console.log(this.authService.isTokenExpired());

    if (!this.authService.isTokenExpired()) {
      this.router.navigate(['verify']);
    }
  }

  // validation checking
  isFieldInvalidFormField(fieldName: string): boolean {
    const field = this.loginForm.get(fieldName);
    return field ? field.invalid && field.touched : false;
  }

  public loginFormSubmition() {
    Object.keys(this.loginForm.controls).forEach((key) => {
      const control = this.loginForm.get(key);
      if (control) {
        control.markAsTouched();
      }
    });
    const firstInvalidControl = document.querySelector('input.ng-invalid');
  }

  public otpFormSubmition() {
    Object.keys(this.otpForm.controls).forEach((key) => {
      const control = this.otpForm.get(key);
      if (control) {
        control.markAsTouched();
      }
    });
    const firstInvalidControl = document.querySelector('input.ng-invalid');
  }

  public passwordFormSubmition() {
    Object.keys(this.passwordForm.controls).forEach((key) => {
      const control = this.passwordForm.get(key);
      if (control) {
        control.markAsTouched();
      }
    });
    const firstInvalidControl = document.querySelector('input.ng-invalid');
  }

  // login
  public loginOfficer() {
    this.loginFormSubmition();
    if (this.loginForm.valid) {
      this.authService.officerLogin(this.authRequest).subscribe({
        next: (data: any) => {
          console.log(data);

          this.authService.setToken(data.officer.accessToken);

          this.router.navigate(['verify']);
        },
        error: (err: any) => {
          AppUtils.openToast('error', err.error.message, 'Error');
        },
      });
    }
  }

  // send otp to email
  public sendEmail() {
    this.submitted = false
    if (this.forgetPasswordRequest.email.trim() !== '') {
      if (this.isValid) {
        this.authService.sendEmail(this.forgetPasswordRequest).subscribe({
          next: (data: any) => {
            AppUtils.openToast('success', data.message, 'Success');
            this.otp1 = '';
            this.otp2 = '';
            this.otp3 = '';
            this.otp4 = '';
            AppUtils.modalDismiss('sendOtp');
          },
          error: (err) => {
            AppUtils.openToast('error', err.error.message, 'Error');
          },
        });
      } else {
        AppUtils.openToast('error', 'Please enter vaild email', 'Error');
      }
    } else {
      AppUtils.openToast('error', 'Email is required', 'Error');
    }
  }

  // verify otp
  public verifyOtp() {
    this.otpFormSubmition();
    this.submitted = true
      if (this.otpForm.valid) {
        this.forgetPasswordRequest.otp =
          this.otp1 + this.otp2 + this.otp3 + this.otp4;
        this.authService.verifyOtp(this.forgetPasswordRequest).subscribe({
          next: (data: any) => {
            AppUtils.openToast('success', data.message, 'Success');
            AppUtils.modalDismiss('verifyOtp');
            this.submitted = false
          },
          error: (err) => {
            AppUtils.openToast('error', err.error.message, 'Error');
          },
        });
    }else AppUtils.openToast('error', "OTP required", 'Error');
  }

  // set new password
  public setNewPassword() {
    this.passwordFormSubmition();
    this.submitted = true;
    if(this.passwordForm.valid){
      if (this.confimPassword === this.forgetPasswordRequest.newPassword) {
        this.authService.setNewPassword(this.forgetPasswordRequest).subscribe({
          next: (data: any) => {
            AppUtils.openToast('success', data.message, 'Success');
            AppUtils.modalDismiss('passwordModelClose');
          },
          error: (err) => {
            AppUtils.openToast('error', err.error.message, 'Error');
          },
        });
      } else AppUtils.openToast('error', "passowrd doesn't match", 'Error');
    }else AppUtils.openToast('error', "Password required", 'Error');
  }

  changePasswordIcon(element: any) {
    AppUtils.changePassowrdIcon(element);
  }

  otpModelManger() {
    const inputs = document.getElementById('inputs') as HTMLInputElement;
    inputs.addEventListener('keyup', function (e) {
      const target = e.target as HTMLInputElement;
      const val = target.value;
      if (isNaN(Number(val))) {
        target.value = '';
        return;
      }
      if (val != '') {
        const next = target.nextElementSibling as HTMLInputElement;
        if (next) {
          next.focus();
        }
      }
    });
    inputs.addEventListener('keyup', function (e) {
      const target = e.target as HTMLInputElement;
      const key = e.key.toLowerCase();
      if (key == 'backspace' || key == 'delete') {
        target.value = '';
        const prev = target.previousElementSibling as HTMLInputElement;
        if (prev) {
          prev.focus();
        }
        return;
      }
    });
  }

  public checkEmailValidation() {
    this.isValid = this.appUtils.isEmail(this.forgetPasswordRequest.email);
  }

  public clearData() {
    this.forgetPasswordRequest.email = '';
  }
}
