import { envrionnment } from "src/environments/envrionnment";

export class ApiRoutes {

    public static  BASE_URL = envrionnment.hostUrl;
    



    public static PORTAL_OFFICER_LOGIN = this.BASE_URL + "/portalOfficer/login";
    public static PORTAL_OFFICER_GET = this.BASE_URL + "/portalOfficer";
    public static PORTAL_OFFICER_UPDATE = this.BASE_URL + "/portalOfficer";
    public static PORTAL_OFFICER_CHANGE_PASS = this.BASE_URL + "/portalOfficer/changePassword";
    public static PORTAL_OFFICER_SEND_OTP_TO_EMAIL = this.BASE_URL + "/portalOfficer/sendOtpToEmail-web";
    public static PORTAL_OFFICER_VERIFY_OTP = this.BASE_URL + "/portalOfficer/verifyOtp-web";
    public static PORTAL_OFFICER_NEW_PASSWORD = this.BASE_URL + "/portalOfficer/newPassword-web";



    public static PORTAL_OFFICER_DASHBOARD = this.BASE_URL + '/addressVerification/portalOfficerDashboard-web';
    public static PORTAL_OFFICER_VERIFICATION_REQUESTS = this.BASE_URL + '/addressVerification/portalOfficerByStatus-web?status=';
    public static PORTAL_OFFICER_VERIFICATION_REQUEST_DETAILS = this.BASE_URL + '/addressVerification/requestDetails?uuid=';
    public static OFFICER_ASSIGNED_VERIFICATION_REQUESTS = this.BASE_URL + '/addressVerification/officerAssignedRequests-web';
    public static VERIFICATION_STATICS = this.BASE_URL + '/addressVerification/verificationStatistics-web';
    
    
    
    public static ADDRESS_OFFICER_GET = this.BASE_URL + '/officer/getAllOfficers-web';
    public static ADDRESS_OFFICER_ADD = this.BASE_URL + '/officer';
    public static ADDRESS_OFFICER_UPDATE = this.BASE_URL + '/officer/updateOfficer-web';
    public static ADDRESS_OFFICER_UPDATE_STATUS = this.BASE_URL + '/officer/updateOfficerStatus-web';
    public static ADDRESS_OFFICER_GET_BY_ID = this.BASE_URL + '/officer/getOfficer-web?userId=';
    public static ADDRESS_OFFICER_DELETE_BY_ID = this.BASE_URL + '/officer/deleteOfficer-web?userId=';
    public static ADDRESS_OFFICER_TOP = this.BASE_URL + '/officer/getTopVerficationOfficers-web';
    public static ACTIVE_ADDRESS_OFFICER = this.BASE_URL + '/officer/getActiveVerificationOfficer-web?officerId=';
    public static REASSIGN_OFFICER = this.BASE_URL + '/addressVerification/re-assignOfficer-web';
    public static DELETE_VOICE_DIRECTION = this.BASE_URL +"/address/voiceDirections?id="










    

}
