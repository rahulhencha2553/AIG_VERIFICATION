import { AddressData } from "./address-data";
import { ReqeustorData } from "./reqeustor-data";

export class VerificationRequestsDetailsWeb {
    
	public  uuid='';
	public  date='';
	public  requestorData!:ReqeustorData;
	public  addressData!:AddressData;
	public  aigCode='';
	public  blockCode='';
}
