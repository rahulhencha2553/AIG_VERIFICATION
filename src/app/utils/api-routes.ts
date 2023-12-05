import { envrionnment } from "src/environments/envrionnment";

export class ApiRoutes {

    public static  BASE_URL = envrionnment.hostUrl;



    public static PORTAL_OFFICER_LOGIN = this.BASE_URL + "/portalOfficer/login";
    public static PORTAL_OFFICER_GET = this.BASE_URL + "/portalOfficer";
    public static PORTAL_OFFICER_UPDATE = this.BASE_URL + "/portalOfficer";
    public static PORTAL_OFFICER_CHANGE_PASS = this.BASE_URL + "/portalOfficer/changePassword";

    public static PORTAL_OFFICER_DASHBOARD = this.BASE_URL + '/addressVerification/portalOfficerDashboard-web';
    
    public static PORTAL_OFFICER_VERIFICATION_REQUESTS = this.BASE_URL + '/addressVerification/portalOfficerByStatus-web?status=';
    
    public static ADDRESS_OFFICER_GET = this.BASE_URL + '/officer/getAllOfficers-web';
    public static ADDRESS_OFFICER_ADD = this.BASE_URL + '/officer';
    public static ADDRESS_OFFICER_UPDATE = this.BASE_URL + '/officer/updateOfficer-web';
    public static ADDRESS_OFFICER_UPDATE_STATUS = this.BASE_URL + '/officer/updateOfficerStatus-web';
    public static ADDRESS_OFFICER_GET_BY_ID = this.BASE_URL + '/officer/getOfficer-web?userId=';
    public static ADDRESS_OFFICER_DELETE_BY_ID = this.BASE_URL + '/officer/deleteOfficer-web?userId=';

    

}
