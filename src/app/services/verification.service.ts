import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiRoutes } from '../utils/api-routes';
import { OfficerAssignedRequests } from '../payload/officer-assigned-requests';
import { ReAssingOfficerRequest } from '../payload/re-assing-officer-request';
import { ReportStatisticsRequest } from '../payload/report-statistics-request';
import { PageRequests } from '../payload/page-requests';

@Injectable({
  providedIn: 'root'
})
export class VerificationService {
  
  constructor(private httpClient:HttpClient) { }

  public getVerificationRequestDetails(uuid: string) : Observable<any> {
    return this.httpClient.get<any>(ApiRoutes.PORTAL_OFFICER_VERIFICATION_REQUEST_DETAILS+uuid);
  }

  public officerAssignedRequests(officerAssignedRequests:OfficerAssignedRequests): Observable<any>{
    return this.httpClient.post<any>(ApiRoutes.OFFICER_ASSIGNED_VERIFICATION_REQUESTS,officerAssignedRequests);
  }

 public reAssignOfficer(reAssignOfficerRequest:ReAssingOfficerRequest): Observable<any>{
  return this.httpClient.put<any>(ApiRoutes.REASSIGN_OFFICER,reAssignOfficerRequest);
 }


 
  // top 10 verificaion officers
  public topVerificationOfficers(): Observable<any>{
    return this.httpClient.get<any>(ApiRoutes.ADDRESS_OFFICER_TOP);
  }


  // active officers except officer having officerId
  public activeVerificationOfficer(officerId:any,pageRequest:any): Observable<any>{
    return this.httpClient.post<any>(ApiRoutes.ACTIVE_ADDRESS_OFFICER+officerId,pageRequest);
  }

  public deleteVoiceDirection(id:any): Observable<any>{
    return this.httpClient.delete<any>(ApiRoutes.DELETE_VOICE_DIRECTION+id);
  }

  public deleteRouteVideo(id:any): Observable<any>{
    return this.httpClient.delete<any>(ApiRoutes.DELETE_ROUTE_DIRECTION+id);
  }


  public getAllVerificationRequestsCount():Observable<any> {
    return this.httpClient.get<any>(ApiRoutes.GET_ALL_VERIFICATION_REQUESTS_COUNT);
  }

  public getVerificationReportSatistics(request:ReportStatisticsRequest):Observable<any>{
    return this.httpClient.post<any>(ApiRoutes.REPORT_VERIFICATION_BAR,request);
  }

  public searchAssignOfficers(search: any, pageRequest: PageRequests):Observable<any> {
    return this.httpClient.post<any>(ApiRoutes.SEARCH_ASSIGN_OFFICERS+search,pageRequest);
  }
}
