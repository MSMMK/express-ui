import { Component, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ChartModule } from 'primeng/chart';
import { RouterModule } from '@angular/router';
import { HeadCardComponent } from "../common/head-card/head-card.component";

@Component({
    selector: 'app-dashboard',
    imports: [CommonModule, CardModule, ChartModule, RouterModule, HeadCardComponent],
    templateUrl: './dashboard.html',
    styleUrls: ['./dashboard.scss']
})
export class Dashboard {
  isBrowser = false;
  lineData: any;
  doughnutData: any;
  chartOptions: any;

  statistics = [
    { label: 'إجمالي الرصيد', value: 5750.00 , icon: 'pi pi-wallet', color: '#1B0F31' },
    { label: 'الرصيد الرئيسي', value:  3450.00, icon: 'pi pi-dollar', color: '#d4211eff' },
    { label: 'الرصيد الائتماني', value: 2300.00, icon: 'pi pi-credit-card', color: '#0C4842' },
    { label: 'إجمالي التحملات', value: 1500, icon: 'pi pi-chart-line', color: '#07403C' }
  ];

  constructor() {
    this.isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  }

  ngOnInit(): void {
    this.lineData = {
      labels: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو'],
      datasets: [
        {
          label: 'الرصيد',
          data: [1000, 1600, 1400, 1800, 2300],
          fill: true,
          tension: 0.4,
          borderColor: '#4D20D2',
          backgroundColor: 'rgba(12, 72, 66, 0.1)'
        }
      ]
    };

    this.doughnutData = {
      labels: ['فودافون كاش', 'فوري', 'أخرى'],
      datasets: [
        {
          data: [45, 30, 25],
          backgroundColor: ['#4D20D2', '#d4211eff', 'rgba(12, 72, 66, 0.1)'],
          borderWidth: 1
        }
      ]
    };

    this.chartOptions = {
      responsive: true,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            color: '#444'
          }
        }
      }
    };
  }
}
