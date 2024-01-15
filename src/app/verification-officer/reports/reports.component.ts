import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartComponent } from 'ng-apexcharts';
import { AreaCharts } from 'src/app/charts/area-charts';
import { PieCharts } from 'src/app/charts/pie-charts';
import { StackedCharts } from 'src/app/charts/stacked-charts';
import { AddressOfficerResponse } from 'src/app/payload/address-officer-response';
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

  constructor(private verificationSerice: VerificationService) {
    this.verificationOptions = this.verificationGraph.chartOptions;
    this.verificationOptions.plotOptions.bar.columnWidth = '15%';

    this.pieChartOptions = this.pieGraph.chartOptions;

    this.areaOptions = this.areaGraph.chartOptions;
  }

  ngOnInit(): void {
    this.getTopVerificationOfficers();
  }

  public togglePasswordVisibility(password: any): void {
    const currentVisibility = this.passwordVisibilityMap.get(password) || false;
    this.passwordVisibilityMap.set(password, !currentVisibility);
  }

  public isPasswordVisible(password: any): boolean {
    return this.passwordVisibilityMap.get(password) || false;
  }

  getTopVerificationOfficers() {
    this.verificationSerice.topVerificationOfficers().subscribe({
      next: (data: any) => {
        this.addressOfficers = data.data;
      },
      error: (err: any) => {
        AppUtils.openToast('error', err.error.message, 'Error');
      },
    });
  }
}
