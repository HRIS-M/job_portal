import { Component, Input, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartData } from 'chart.js';
import {ThemeService} from "../../../../services/theme.service";

@Component({
  selector: 'app-viewer-types-pie-chart',
  templateUrl: './viewer-types-pie-chart.component.html',
  styleUrls: ['./viewer-types-pie-chart.component.scss']
})
export class ViewerTypesPieChartComponent implements OnInit {
  @Input() jobData: any[] = [];

  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      }
    }
  };

  public pieChartType: ChartType | any = 'pie';

  public pieChartData: ChartData<'pie'> = {
    labels: [],
    datasets: []
  };

  constructor(private themeService: ThemeService) { }

  ngOnInit(): void {
    this.populateChartData();
    this.applyTheme();
  }

  populateChartData(): void {
    if (!this.jobData || this.jobData.length === 0) {
      return;
    }

    const viewerTypeMap: { [type: string]: number } = { 'Guest': 0, 'Registered': 0 };

    // Loop through each job's viewers and count viewer types
    this.jobData.forEach(job => {
      job.viewers.forEach((viewer: any) => {
        if (viewer.name && viewer.name.includes('Guest')) {
          viewerTypeMap['Guest']++;
        } else {
          viewerTypeMap['Registered']++;
        }
      });
    });

    // Update chart data
    this.pieChartData.labels = ['Guest', 'Registered'];
    this.pieChartData.datasets = [{
      data: [viewerTypeMap['Guest'], viewerTypeMap['Registered']],
      backgroundColor: ['#FF6384', '#36A2EB']
    }];
  }

  applyTheme(): void {
    const axisColor = this.themeService.isDarkMode() ? '#fff' : '#222';
    const tooltipBackgroundColor = this.themeService.isDarkMode() ? '#333333' : '#ffffff';
    const tooltipFontColor = this.themeService.isDarkMode() ? '#fff' : '#222';

    this.pieChartOptions = {
      responsive: true,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            color: axisColor
          }
        },
        tooltip: {
          backgroundColor: tooltipBackgroundColor,
          titleColor: tooltipFontColor,
          bodyColor: tooltipFontColor,
        }
      }
    };
  }
}
