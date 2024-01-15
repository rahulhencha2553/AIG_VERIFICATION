import { Status } from "../models/status";
import { AddressAllData } from "./address-all-data";
import { RequestorAllData } from "./requestor-all-data";
import { Summary } from "./summary";

export class   VerificationRequestDetails {
    public   uuid = '';
    public   date = '';
    public   verificationStatus!:Status;
    public   addressData !: AddressAllData;
    public   requestorData !: RequestorAllData;
    public   summary !: Summary;
    public verificationOfficerId='';
}
