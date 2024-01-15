import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent as VerificationOfficerLogin} from './verification-officer/login/login.component';
import { VerificationPortalComponent } from './verification-officer/verification-portal/verification-portal.component';
import { DashboardComponent as VerificationOfficerDashboard } from './verification-officer/dashboard/dashboard.component';
import { AddressOfficerComponent } from './verification-officer/address-officer/address-officer.component';
import { VerificationComponent } from './verification-officer/verification/verification.component';
import { ReportsComponent } from './verification-officer/reports/reports.component';
import { NotificationsComponent as VerificationOfficerNotification} from './verification-officer/notifications/notifications.component';
import { RequestDetailsComponent } from './verification-officer/request-details/request-details.component';
import { AssignOfficerComponent } from './verification-officer/assign-officer/assign-officer.component';
import { AddressOfficerDetailsComponent } from './verification-officer/address-officer-details/address-officer-details.component';


const routes: Routes = [
  {
    path:'',component:VerificationOfficerLogin,pathMatch:'full'
  },
  {
    path:'verify',component:VerificationPortalComponent,children:[
      {path:'',component:VerificationOfficerDashboard,pathMatch:'full'},
      {path:'address-officer',component:AddressOfficerComponent,pathMatch:'full'},
      {path:'verification',component:VerificationComponent,pathMatch:'full'},
      {path:'reports',component:ReportsComponent,pathMatch:'full'}
    ]
  },
  {
    path:'verify/notifications',component:VerificationOfficerNotification,pathMatch:'full'
  },
  {
    path:'verify/request-details/:uuid',component:RequestDetailsComponent,pathMatch:'full'
  },
  {
    path:'verify/assign-officer/:officerId/:requesId',component:AssignOfficerComponent,pathMatch:'full'
  },
  {
    path:'verify/address-officer-details/:uuid',component:AddressOfficerDetailsComponent,pathMatch:'full'
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
