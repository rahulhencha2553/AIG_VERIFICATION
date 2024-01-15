import { Component, OnChanges, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthRequest } from 'src/app/payload/auth-request';
import { ForgetPasswordRequest } from 'src/app/payload/forget-password-request';
import { AuthService } from 'src/app/services/auth.service';
import { AppUtils } from 'src/app/utils/app-utils';
import { FormValidator } from 'src/app/utils/form-validator';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [AppUtils],
})
export class LoginComponent implements OnInit {
  public authRequest: AuthRequest = new AuthRequest();
  public loginForm: FormGroup;
  public otpForm: FormGroup ;
  public passwordForm:FormGroup; 
  public emailForm:FormGroup;
  public isValid = false;
  public submitted = false;
  public forgetPasswordRequest: ForgetPasswordRequest = new ForgetPasswordRequest();
  public otp1 = '';
  public otp2 = '';
  public otp3 = '';
  public otp4 = '';
  public confimPassword = '';
  
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
    });

    this.emailForm = this.formBuilder.group({
      email : ['',Validators.required]
    })
  }

  ngOnInit(): void {
    this.otpModelManger();
    this.checkIsAlreadyLoggedIn();
  }


  // send to dashobard if didn't logout
  public checkIsAlreadyLoggedIn() {
    console.log(this.authService.isTokenExpired());

    if (!this.authService.isTokenExpired()) {
      this.router.navigate(['verify']);
    }
  }

  // validation checking
  public isFieldInvalid(fieldName: string,form:any): boolean {
    return FormValidator.formValidCheck(fieldName,form);
  }

 
  // login
  public loginOfficer() {
    FormValidator.formSubmittion(this.loginForm);
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
    this.checkEmailValidation()
    FormValidator.formSubmittion(this.emailForm);
    if (this.emailForm.valid) {
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
    }
  }

  // verify otp
  public verifyOtp() {
   FormValidator.formSubmittion(this.otpForm)
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
    FormValidator.formSubmittion(this.passwordForm)
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
    }
  }

  public changePasswordIcon(element: any) {
    AppUtils.changePassowrdIcon(element);
  }

  public otpModelManger() {
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
    this.loginForm.reset();
    this.otpForm.reset();
    this.passwordForm.reset();
    this.emailForm.reset();
  }
}
