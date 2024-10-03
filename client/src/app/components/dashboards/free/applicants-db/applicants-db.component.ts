import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {JobApplyService} from "../../../../services/job-apply.service";
import {AuthService} from "../../../../services/auth.service";
import {Router} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";
import {AlertsService} from "../../../../services/alerts.service";

declare var bootstrap: any;

@Component({
  selector: 'app-applicants-db',
  templateUrl: './applicants-db.component.html',
  styleUrls: ['./applicants-db.component.scss']
})
export class ApplicantsDbComponent implements AfterViewInit, OnInit {
  @ViewChild('table', { static: false }) table: ElementRef | any;

  companyId: any;
  jobApplicants: any[] = [];

  viewers: any[] = [];
  selectedJobId: any;

  maxApplicantsDisplayed: number = 1;

  loading: boolean = false;

  serverError: boolean = false;
  notFound: boolean = false;
  forbidden: boolean = false;
  corsError: boolean = false;
  unexpectedError: boolean = false;

  constructor(
    private jobApplyService: JobApplyService,
    private router: Router,
    private alertService: AlertsService,
    private cookieService: AuthService) { }

  ngOnInit(): void {
    this.companyId = this.cookieService.organization();
    this.fetchApplicants();
  }

  ngAfterViewInit() {
    const icons = document.querySelectorAll('.material-icons');
    icons.forEach((icon) => {
      icon.setAttribute('translate', 'no');
    });

    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
      return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    const viewsModal = document.getElementById('viewsModel');
    if (viewsModal) {
      viewsModal.addEventListener('show.bs.modal', (event: any) => {
        const button = event.relatedTarget;
        const jobId = button.getAttribute('data-bs-whatever');

        this.selectedJobId = jobId;
        this.fetchJobViewers(this.selectedJobId);
      });
    }
  }

  fetchApplicants() {
    this.loading = true;
    this.jobApplyService.fetchJobApplyByCompanyId(this.companyId).subscribe((data: any) => {
      this.jobApplicants = data?.map((job: any) => ({
        ...job,
        showAllApplicants: false
      }));
      this.loading = false;
    }, (error: HttpErrorResponse) => {
      // Check for different error types
      if (error.status === 404) {
        this.notFound = true;
      } else if (error.status === 500) {
        this.serverError = true;
      } else if (error.status === 0) {
        this.corsError = true;
      } else if (error.status === 403) {
        this.forbidden = true;
      } else {
        this.unexpectedError = true;
      }

      this.loading = false;
    });
  }

  fetchJobViewers(jobId: any) {
    this.jobApplyService.fetchJobViewerByJobId(jobId).subscribe((data: any) => {
      this.viewers = data;
    }, (error: HttpErrorResponse) => {
      console.error('Error fetching job viewers', error);
      this.viewers = [];
    });
  }

  viewCandidateProfile(employeeId: any) {
    if (employeeId) {
      this.router.navigate(['/candidate-profile'], { queryParams: { id: employeeId } });
      setTimeout(() => {
        window.location.reload();
      },500)
    }
  }

  toggleApplicants(job: any) {
    job.showAllApplicants = !job.showAllApplicants;
  }

  analyzeJob(jobId: any) {
    if (jobId) {
      const url = this.router.serializeUrl(
        this.router.createUrlTree(['/job-analysis', jobId])
      );
      window.open(url, '_blank');
    }
  }

  exportToCsv(jobId: any, applicants: any) {
    if (!applicants || !applicants.length) {
      this.alertService.warningMessage('No data to export', 'Warning');
      return;
    }

    const csvData = this.datasetToCsv(applicants);
    this.downloadCsv(csvData, `${jobId}-data.csv`);
  }

  datasetToCsv(applicants: any[]): string {
    // Extract headers from the first object keys
    const headers = Object.keys(applicants[0]).join(',');

    // Process each object (applicant) into CSV row format
    const rows = applicants.map(applicant => {
      return Object.values(applicant).map(value => `"${value}"`).join(',');
    });

    // Combine headers and rows
    return [headers, ...rows].join('\n');
  }

  downloadCsv(csv: string, filename: string) {
    const csvBlob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(csvBlob);
    const a = document.createElement('a');
    a.setAttribute('href', url);
    a.setAttribute('download', filename);
    a.click();
    window.URL.revokeObjectURL(url);
  }
}
