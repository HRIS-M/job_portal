import { Component, Input, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartData } from 'chart.js';

@Component({
  selector: 'app-resume-download-rates-chart',
  templateUrl: './resume-download-rates-chart.component.html',
  styleUrls: ['./resume-download-rates-chart.component.scss']
})
export class ResumeDownloadRatesChartComponent implements OnInit {
  @Input() jobData: any[] = [];

  public barChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    scales: {
      x: {},
      y: {
        beginAtZero: true
      }
    },
    plugins: {
      legend: {
        position: 'top',
      }
    }
  };

  public barChartType: ChartType | any = 'bar';
  public barChartData: ChartData<'bar'> = {
    labels: [],
    datasets: []
  };

  ngOnInit(): void {
    this.populateChartData();
  }

  populateChartData(): void {
    if (!this.jobData || this.jobData.length === 0) {
      return;
    }

    const resumeDownloadMap: { [jobId: string]: number } = {};

    // Loop through applicants and count resume availability per job
    this.jobData.forEach(job => {
      const resumesAvailable = job.applicants.filter((applicant: any) => applicant.resume).length;
      resumeDownloadMap[job.jobId] = resumesAvailable;
    });

    // Extract job IDs and resume counts
    const jobIds = Object.keys(resumeDownloadMap);
    const counts = Object.values(resumeDownloadMap);

    // Update chart data
    this.barChartData.labels = jobIds;
    this.barChartData.datasets = [{
      label: 'Resumes Available for Download',
      data: counts,
      backgroundColor: '#66BB6A'
    }];
  }
}
