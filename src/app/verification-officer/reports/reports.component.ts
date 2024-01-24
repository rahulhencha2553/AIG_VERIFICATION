import {
  AfterContentChecked,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ChartComponent } from 'ng-apexcharts';
import { AreaCharts } from 'src/app/charts/area-charts';
import { PieCharts } from 'src/app/charts/pie-charts';
import { StackedCharts } from 'src/app/charts/stacked-charts';
import { AddressOfficerResponse } from 'src/app/payload/address-officer-response';
import { ReportStatisticsRequest } from 'src/app/payload/report-statistics-request';
import { VerificationService } from 'src/app/services/verification.service';
import { AppUtils } from 'src/app/utils/app-utils';

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
  stroke: any;
  labels: any;
  yaxis: any;
};

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
})
export class ReportsComponent implements OnInit {
  @ViewChild('chart') chart: ChartComponent | undefined;
  public verificationOptions: Partial<ChartOptions>;
  public pieChartOptions: Partial<ChartOptions>;
  public areaOptions: Partial<ChartOptions>;
  public verificationGraph: StackedCharts = new StackedCharts();
  public pieGraph: PieCharts = new PieCharts();
  public areaGraph: AreaCharts = new AreaCharts();
  public addressOfficers: AddressOfficerResponse[] = [];
  public passwordVisibilityMap = new Map<any, boolean>();
  public staticsRequestBar: ReportStatisticsRequest =
    new ReportStatisticsRequest();

  public staticsRequestArea: ReportStatisticsRequest =
    new ReportStatisticsRequest();

  constructor(private verificationService: VerificationService) {
    this.verificationOptions = this.verificationGraph.chartOptions;
    this.verificationOptions.plotOptions.bar.columnWidth = '15%';
    this.pieChartOptions = this.pieGraph.chartOptions;
    this.areaOptions = this.areaGraph.chartOptions;
  }

  ngOnInit(): void {
    this.getTopVerificationOfficers();
    this.getAllVerificationRequestsCount();
    this.staticsRequestBar.year = new Date().getFullYear();
    this.staticsRequestBar.month = 0;

    this.staticsRequestArea.month = new Date().getMonth() + 1
    this.staticsRequestArea.year = this.staticsRequestBar.year;
    this.getVerificationReportStatistics();
    this.getPendingReportStatistics();
  }

  public togglePasswordVisibility(password: any): void {
    const currentVisibility = this.passwordVisibilityMap.get(password) || false;
    this.passwordVisibilityMap.set(password, !currentVisibility);
  }

  public isPasswordVisible(password: any): boolean {
    return this.passwordVisibilityMap.get(password) || false;
  }

  public getTopVerificationOfficers() {
    this.verificationService.topVerificationOfficers().subscribe({
      next: (data: any) => {
        this.addressOfficers = data.data;
      },
      error: (err: any) => {
        AppUtils.openToast('error', err.error.message, 'Error');
      },
    });
  }

  public getAllVerificationRequestsCount() {
    this.verificationService.getAllVerificationRequestsCount().subscribe({
      next: (data: any) => {
        this.pieChartOptions.series = [
          data.totalRequest.verified,
          data.totalRequest.pending,
          data.totalRequest.rejected,
        ];
        console.log(this.pieChartOptions.series);
      },
      error: (err: any) => {},
    });
  }

  public setReportStatisticsData(
    month: any = this.staticsRequestBar.month,
    year: any = this.staticsRequestBar.year
  ) {
    this.staticsRequestBar.month = month;
    this.staticsRequestBar.year = year;
    this.getVerificationReportStatistics();
  }


  public setReportStatisticsDataArea(
    month: any = this.staticsRequestArea.month,
    year: any = this.staticsRequestArea.year
  ) {
    this.staticsRequestArea.month = month;
    this.staticsRequestArea.year = year;
    this.getPendingReportStatistics();
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

  getMonth(isArea:boolean) {
    if(!isArea){
    if (this.staticsRequestBar.month != 0)
      return AppUtils.months[this.staticsRequestBar.month - 1];
    }else
    {
      if (this.staticsRequestArea.month != 0)
      return AppUtils.months[this.staticsRequestArea.month - 1];
    }
    return 'Month';
  }

  getYears() {
    return AppUtils.getYearsArray();
  }



  getPendingReportStatistics() {
    this.verificationService
      .getVerificationReportSatistics(this.staticsRequestArea)
      .subscribe({
        next: (data: any) => {
          this.areaOptions.series = [
            {
              name: 'Pending',
              data: data.series.Pending,
            },
          ];
          this.areaOptions.labels = this.makeLabelsArea(data.category);
        },
        error: (err: any) => {
          AppUtils.openToast('error', err.error.message, 'Error');
        },
      });
  }

  makeLabelsArea(category:any[]){
    let lables:any[]=[]
    console.log(category);
    
           category.forEach(c=>{
                lables.push(c+" "+this.getMonth(true).slice(0,3));
           })
           return lables;
  }
}
