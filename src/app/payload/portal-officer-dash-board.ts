import { PendingRequest } from './pending-request';

export class PortalOfficerDashBoard {
  public pendingVerification = 0;
  public verifiedAddress = 0;

  public rejectedVerifications = 0;
  public verificationOfficers = 0;

  public pendingVerifications: PendingRequest[] = [];
}
