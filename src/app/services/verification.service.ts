import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiRoutes } from '../utils/api-routes';

@Injectable({
  providedIn: 'root'
})
export class VerificationService {
  
  constructor(private httpClient:HttpClient) { }

  public getVerificationRequestDetails(uuid: string) : Observable<any> {
    return this.httpClient.get<any>(ApiRoutes.PORTAL_OFFICER_VERIFICATION_REQUEST_DETAILS+uuid);
  }
}
