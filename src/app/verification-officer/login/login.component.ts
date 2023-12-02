import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthRequest } from 'src/app/payload/auth-request';
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
  ngOnInit(): void {}

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

 


}
