import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { LoginComponent as VerificationOfficerLogin} from './verification-officer/login/login.component';
import { SideBarComponent } from './verification-officer/navigation-bar/side-bar/side-bar.component';
import { ProfileBarComponent } from './verification-officer/navigation-bar/profile-bar/profile-bar.component';
import { VerificationPortalComponent } from './verification-officer/verification-portal/verification-portal.component';
import { DashboardComponent as VerificationDashboard } from './verification-officer/dashboard/dashboard.component';
import { AddressOfficerComponent } from './verification-officer/address-officer/address-officer.component';
import { VerificationComponent } from './verification-officer/verification/verification.component';
import { ReportsComponent } from './verification-officer/reports/reports.component';
import { NotificationsComponent as VerificationOfficerNotification} from './verification-officer/notifications/notifications.component';
import { RequestDetailsComponent } from './verification-officer/request-details/request-details.component';
import { AssignOfficerComponent } from './verification-officer/assign-officer/assign-officer.component';
import { AddressOfficerDetailsComponent } from './verification-officer/address-officer-details/address-officer-details.component';
import { HttpClientModule } from '@angular/common/http';
import { VerificationInterceptor, authInterceptorProvider } from './interceptor/verification.interceptor';
import { NumberFormatPipe } from './pipes/number-format.pipe';


@NgModule({
  declarations: [
    AppComponent,
    VerificationOfficerLogin,
    SideBarComponent,
    ProfileBarComponent,
    VerificationPortalComponent,
    VerificationDashboard,
    AddressOfficerComponent,
    VerificationComponent,
    ReportsComponent,
    VerificationOfficerNotification,
    RequestDetailsComponent,
    AssignOfficerComponent,
    AddressOfficerDetailsComponent,
    NumberFormatPipe,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
    
  ],
  providers: [authInterceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
