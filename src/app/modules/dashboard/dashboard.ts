import { Component, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ChartModule } from 'primeng/chart';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-dashboard',
    imports: [CommonModule, CardModule, ChartModule, RouterModule],
    templateUrl: './dashboard.html',
    styleUrls: ['./dashboard.scss']
})
export class Dashboard {
  isBrowser = false;
  lineData: any;
  doughnutData: any;
  chartOptions: any;

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
          borderColor: '#1B0F31',
          backgroundColor: 'rgba(12, 72, 66, 0.1)'
        }
      ]
    };

    this.doughnutData = {
      labels: ['فودافون كاش', 'فوري', 'أخرى'],
      datasets: [
        {
          data: [45, 30, 25],
          backgroundColor: ['#1B0F31', '#d4211eff', 'rgba(12, 72, 66, 0.1)'],
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
