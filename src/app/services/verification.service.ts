import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiRoutes } from '../utils/api-routes';
import { OfficerAssignedRequests } from '../payload/officer-assigned-requests';

@Injectable({
  providedIn: 'root'
})
export class VerificationService {
  
  constructor(private httpClient:HttpClient) { }

  public getVerificationRequestDetails(uuid: string) : Observable<any> {
    return this.httpClient.get<any>(ApiRoutes.PORTAL_OFFICER_VERIFICATION_REQUEST_DETAILS+uuid);
  }

  public officerAssignedRequests(officerAssignedRequests:OfficerAssignedRequests){
    return this.httpClient.post<any>(ApiRoutes.OFFICER_ASSIGNED_VERIFICATION_REQUESTS,officerAssignedRequests);
  }
 
  // top 10 verificaion officers
  public topVerificationOfficers(){
    return this.httpClient.get<any>(ApiRoutes.ADDRESS_OFFICER_TOP);
  }

}
