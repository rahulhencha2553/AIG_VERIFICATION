import { Component, OnInit, ViewChild } from '@angular/core';
import { PortalOfficerDashBoard } from 'src/app/payload/portal-officer-dash-board';
import { DashboardService } from 'src/app/services/dashboard.service';
import { AppUtils } from 'src/app/utils/app-utils';
import { ChartComponent } from 'ng-apexcharts';
import { StackedCharts } from 'src/app/charts/stacked-charts';
import { ReportStatisticsRequest } from 'src/app/payload/report-statistics-request';
import { VerificationService } from 'src/app/services/verification.service';
export type ChartOptions = {
  series: any;
  chart: any;
  dataLabels: any;
  plotOptions: any;
  responsive: any;
  xaxis: any;
  legend: any;
  fill: any;
  colors: any;
};
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  @ViewChild('chart') chart: ChartComponent | undefined;
  public verificationOptions: Partial<ChartOptions>;
  public verificationGraph: StackedCharts = new StackedCharts();
  public officerDashboard: PortalOfficerDashBoard = new PortalOfficerDashBoard();
  public staticsRequestBar: ReportStatisticsRequest =
    new ReportStatisticsRequest();

  constructor(private dashboardService: DashboardService,private verificationService:VerificationService) {
    this.verificationOptions = this.verificationGraph.chartOptions;
  }

  ngOnInit(): void {
    this.getDashboarDetailes();
  //  this.getVerificationsStatistics();
  this.staticsRequestBar.year = new Date().getFullYear();
  this.staticsRequestBar.month = 0;
this.getVerificationReportStatistics();
  }

  public getDashboarDetailes() {
    this.dashboardService.getPortalOfficerDashboardDetails().subscribe({
      next: (data: any) => {
        this.officerDashboard = data.dashboard;
      },
      error: (err: any) => {
        AppUtils.openToast('error', err.error.message, 'Error');
      },
    });
  }

  public getVerificationsStatistics() {
    return this.dashboardService.getVerificationsStatistics().subscribe({
      next: (data: any) => {
        this.verificationOptions.series[0].data = data.verified;
        this.verificationOptions.series[1].data = data.pending;
        this.verificationOptions. xaxis = {
          type: "category",
          categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        };
  
   //     window.dispatchEvent(new Event('resize'));

      },
      error: (err: any) => {
                AppUtils.openToast('error', err.error.message, 'Error');
      },
    });
  }

  // This is for reports column chart
  public getVerificationReportStatistics() {
    this.verificationService
      .getVerificationReportSatistics(this.staticsRequestBar)
      .subscribe({
        next: (data: any) => {
          this.verificationOptions.xaxis = {
            type: 'category',
            categories: data.category,
          };
          this.verificationOptions.series = [
            {
              name: 'Verified',
              data: data.series.Verified,
            },
            {
              name: 'Pending',
              data: data.series.Pending,
            },
          ];
        },
        error: (err: any) => {
          AppUtils.openToast('error', err.error.message, 'Error');
        },
      });
  }
}
