import { AddressData } from "./address-data";
import { ReqeustorData } from "./reqeustor-data";

export class PendingRequest {

    public  uuid = '';
	public  date:any;
	public  requestorData!:ReqeustorData;
	public  addressData!:AddressData;
	
}
