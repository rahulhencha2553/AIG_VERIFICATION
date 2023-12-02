import { Component, OnInit } from '@angular/core';
import { PortalOfficerDashBoard } from 'src/app/payload/portal-officer-dash-board';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{

  officerDashboard:PortalOfficerDashBoard = new PortalOfficerDashBoard()

  constructor(private dashboardService:DashboardService){}

  ngOnInit(): void {
    this.getDashboarDetailes();
  }

  public getDashboarDetailes(){
      this.dashboardService.getPortalOfficerDashboardDetails().subscribe({
        next:(data:any)=>{
          this.officerDashboard = data.dashboard
        },
        error:(err:any)=>{
          console.log(err);
          
        }
      })
  }

}
