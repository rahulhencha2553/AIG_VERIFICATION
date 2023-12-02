import { envrionnment } from "src/environments/envrionnment";

export class ApiRoutes {

    public static  BASE_URL = envrionnment.hostUrl;



    public static PORTAL_OFFICER_LOGIN = this.BASE_URL + "/portalOfficer/login";
    public static PORTAL_OFFICER_GET = this.BASE_URL + "/portalOfficer";
    public static PORTAL_OFFICER_UPDATE = this.BASE_URL + "/portalOfficer";
    public static PORTAL_OFFICER_CHANGE_PASS = this.BASE_URL + "/portalOfficer/changePassword";

    public static PORTAL_OFFICER_DASHBOARD = this.BASE_URL + '/addressVerification/portalOfficerDashboard-web';
    
    public static PORTAL_OFFICER_VERIFICATION_REQUESTS = this.BASE_URL + '/addressVerification/portalOfficerByStatus-web?status=';
    

}
