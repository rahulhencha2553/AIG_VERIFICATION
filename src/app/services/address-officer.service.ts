import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { PageRequests } from '../payload/page-requests';
import { ApiRoutes } from '../utils/api-routes';
import { Observable } from 'rxjs';
import { AddressOfficerResponse } from '../payload/address-officer-response';
import { AddressOfficer } from '../models/address-officer';
import { OfficerUpdateStatus } from '../payload/officer-update-status';

@Injectable({
  providedIn: 'root'
})
export class AddressOfficerService {

  constructor(private httpClient: HttpClient, private router: Router) {

  }

  // add officers
  public addOfficer(addressOfficer: AddressOfficer): Observable<any> {
    let formData = new FormData();

    typeof addressOfficer.profilePicture !== 'string' &&
      formData.append('profilePicture', addressOfficer.profilePicture);
    formData.append('firstName', addressOfficer.firstName);
    formData.append('lastName', addressOfficer.lastName);
    formData.append('email', addressOfficer.email);
    formData.append('phoneNumber', addressOfficer.phoneNumber);
    formData.append('password', addressOfficer.password);
    formData.append('userName', addressOfficer.userName);
    formData.append('placeId', addressOfficer.placeId);
    formData.append('address', addressOfficer.address);
    formData.append('latitude', addressOfficer.latitude);
    formData.append('longitude', addressOfficer.longitude);

    return this.httpClient.post<any>(ApiRoutes.ADDRESS_OFFICER_ADD, formData);
  }

  // update officer 
  public updateOfficer(addressOfficer: AddressOfficer) {
    let formData = new FormData();
    typeof addressOfficer.profilePicture !== 'string' &&
      formData.append('profilePicture', addressOfficer.profilePicture);
    formData.append('userId', addressOfficer.userId);
    formData.append('firstName', addressOfficer.firstName);
    formData.append('lastName', addressOfficer.lastName);
    formData.append('email', addressOfficer.email);
    formData.append('phoneNumber', addressOfficer.phoneNumber);
    formData.append('userName', addressOfficer.userName);
    formData.append('placeId', addressOfficer.placeId);
    formData.append('address', addressOfficer.address);
    formData.append('latitude', addressOfficer.latitude);
    formData.append('longitude', addressOfficer.longitude);

    return this.httpClient.put<any>(ApiRoutes.ADDRESS_OFFICER_UPDATE, formData);
  }

  // update officer status
  public updateOfficerStatus(addressOfficerResponse:OfficerUpdateStatus){
    return this.httpClient.put(ApiRoutes.ADDRESS_OFFICER_UPDATE_STATUS,addressOfficerResponse);
  }


  // delete address officer
  public deleteOfficer(userId: any) {
    return this.httpClient.delete(ApiRoutes.ADDRESS_OFFICER_DELETE_BY_ID + userId);
  }


  // get all officers
  public getAllOfficers(pageRequest: PageRequests): Observable<any> {
    return this.httpClient.post<any>(ApiRoutes.ADDRESS_OFFICER_GET, pageRequest);
  }

  // get address officer by id
  public getAddressOfficerById(userId: any) {
    return this.httpClient.get<any>(ApiRoutes.ADDRESS_OFFICER_GET_BY_ID + userId);
  }



}
