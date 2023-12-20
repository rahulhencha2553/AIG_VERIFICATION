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
  }
  ngOnInit(): void {
    this.otpModelManger()
    this.checkIsAlreadyLoggedIn();
  }

  otp1 = '';
  otp2 = '';
  otp3 = '';
  otp4 = '';
  confimPassword = '';






// send to dashobard if didn't logout
checkIsAlreadyLoggedIn(){
  console.log(this.authService.isTokenExpired());
  
  if(!this.authService.isTokenExpired()){
    this.router.navigate(['verify'])
  }
}







  // validation checking
  isFieldInvalidForLoginForm(fieldName: string): boolean {
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
          console.log(err);
        },
      });
    }
  }

  // send otp to email
  public sendEmail() {
    this.authService.sendEmail(this.forgetPasswordRequest).subscribe(
      (data: any) => {
        console.log(data.message);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  // verify otp
  public verifyOtp() {
    this.forgetPasswordRequest.otp =
      this.otp1 + this.otp2 + this.otp3 + this.otp4;
    this.authService.verifyOtp(this.forgetPasswordRequest).subscribe(
      (data: any) => {
        console.log(data.message);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  // set new password
  public setNewPassword() {
    if (this.confimPassword === this.forgetPasswordRequest.newPassword) {
      this.authService.setNewPassword(this.forgetPasswordRequest).subscribe(
        (data: any) => {
          console.log(data.message);
        },
        (err) => {
          console.log(err);
        }
      );
    } else alert("confirm password didn't match");
  }

  changePasswordIcon(element: any) {
    AppUtils.changePassowrdIcon(element);
  }


  otpModelManger(){
    const inputs = document.getElementById("inputs") as HTMLInputElement;
    inputs.addEventListener("keyup", function (e) {
      const target = e.target as HTMLInputElement;
      const val = target.value;
      if (isNaN(Number(val))) {
        target.value = "";
        return;
      }
      if (val != "") {
        const next = target.nextElementSibling as HTMLInputElement;
        if (next) {
          next.focus();
        }
      }
    });
    inputs.addEventListener("keyup", function (e) {
      const target = e.target as HTMLInputElement;
      const key = e.key.toLowerCase();
      if (key == "backspace" || key == "delete") {
        target.value = "";
        const prev = target.previousElementSibling as HTMLInputElement;
        if (prev) {
          prev.focus();
        }
        return;
      }
    });
    
    
    
  }
}
