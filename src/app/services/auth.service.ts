import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { envrionnment } from 'src/environments/envrionnment';
import { AuthRequest } from '../payload/auth-request';
import { ApiRoutes } from '../utils/api-routes';
import { BehaviorSubject, Observable, Subject, share } from 'rxjs';
import { PortalOfficer } from '../models/portal-officer';
import { Router } from '@angular/router';
import { UpdateOfficerRequest } from '../payload/update-officer-request';
import { ChangePasswordRequest } from '../payload/change-password-request';
import { ForgetPasswordRequest } from '../payload/forget-password-request';
//import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public portalOfficer = new BehaviorSubject<any>(null);
  public officer: Observable<any> = this.portalOfficer.asObservable();

  constructor(private httpClient: HttpClient, private router: Router) {

  }

  // login officer
  public officerLogin(authRequest: AuthRequest): Observable<any> {
    return this.httpClient.post(ApiRoutes.PORTAL_OFFICER_LOGIN, authRequest);
  }

  // get logged in officer
  public getLoggedInOfficer(): Observable<any> {
    return this.httpClient.get<any>(ApiRoutes.PORTAL_OFFICER_GET);
  }

  // update portal officer
  public updateOfficer(portalOfficer: UpdateOfficerRequest): Observable<any> {

    let formData = new FormData();

    typeof portalOfficer.profilePicture !== 'string' &&
      formData.append('profilePicture', portalOfficer.profilePicture);
    formData.append('firstName', portalOfficer.firstName);
    formData.append('lastName', portalOfficer.lastName);
    formData.append('email', portalOfficer.email);
    formData.append('phoneNumber', portalOfficer.phoneNumber);

    return this.httpClient.put<any>(ApiRoutes.PORTAL_OFFICER_UPDATE,formData);
  }

  // change password
  public changePassword(changePasswordRequest:ChangePasswordRequest):Observable<any>{
     return this.httpClient.post<any>(ApiRoutes.PORTAL_OFFICER_CHANGE_PASS,changePasswordRequest);
  }

  // send top to email for forget password
  public sendEmail(forgetPasswordRequest:ForgetPasswordRequest){
    return this.httpClient.post<any>(ApiRoutes.PORTAL_OFFICER_SEND_OTP_TO_EMAIL,forgetPasswordRequest);
  }

  // verify otp
  public verifyOtp(forgetPasswordRequest:ForgetPasswordRequest){
    return this.httpClient.post<any>(ApiRoutes.PORTAL_OFFICER_VERIFY_OTP,forgetPasswordRequest);
  }

 // set new password
  public setNewPassword(forgetPasswordRequest:ForgetPasswordRequest){
    return this.httpClient.post<any>(ApiRoutes.PORTAL_OFFICER_NEW_PASSWORD,forgetPasswordRequest);
  }

  // setting tokent to localStorage
  public setToken(token: string) {
    localStorage.setItem('accessToken', token);
  }

  // get token from localStorage
  public getToken() {
    let token = localStorage.getItem('accessToken');
    if (token === undefined) return null;
    return token;
  }

  public getDecodeAccessToken(token:string):any{
 // return jwt_decode(token);
}
  // check token expiration time
  public isTokenExpired() {
    const expiry = (JSON.parse(atob(this.getToken()!.split('.')[1]))).exp;
    return (Math.floor((new Date).getTime() / 1000)) >= expiry;
  }

  public logOut() {
    localStorage.removeItem('accessToken');
    this.router.navigate(['']);
  }
}
