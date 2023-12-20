import { Status } from "../models/status";

export class OfficerAssignedRequests {
  id:any;
  status:Status=Status.Pending; 
  pageNo:any=0;
  pageSize:any=6;
}
