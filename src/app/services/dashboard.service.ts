import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiRoutes } from '../utils/api-routes';
import { Observable } from 'rxjs';
import { Status } from '../models/status';
import { PageRequests } from '../payload/page-requests';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  
  constructor(private httpClient: HttpClient) {
    // this.officer = this.portalOfficer.asObservable().pipe(share());
  }

  // get dashboard details of portal officer
  public getPortalOfficerDashboardDetails():Observable<any>{
    return this.httpClient.get<any>(ApiRoutes.PORTAL_OFFICER_DASHBOARD);
  }

  // get verification requests
  public getPortalOfficerByStatus(status:Status,pageRequests:PageRequests):Observable<any>{
    return this.httpClient.post<any>(ApiRoutes.PORTAL_OFFICER_VERIFICATION_REQUESTS+status,pageRequests);
  }

  public getVerificationsStatistics(){
    return this.httpClient.get(ApiRoutes.VERIFICATION_STATICS);
  }

}
