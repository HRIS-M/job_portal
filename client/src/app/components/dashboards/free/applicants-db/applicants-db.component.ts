import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {JobApplyService} from "../../../../services/job-apply.service";
import {AuthService} from "../../../../services/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import { HttpErrorResponse } from "@angular/common/http";
import {AlertsService} from "../../../../services/alerts.service";
import {EmployeeService} from "../../../../services/employee.service";
import {ThemeService} from "../../../../services/theme.service";
import {CompanyService} from "../../../../services/company.service";

declare var bootstrap: any;

@Component({
  selector: 'app-applicants-db',
  templateUrl: './applicants-db.component.html',
  styleUrls: ['./applicants-db.component.scss']
})
export class ApplicantsDbComponent implements AfterViewInit, OnInit {
  companyId: any;
  jobApplicants: any[] = [];

  loading: boolean = false;

  serverError: boolean = false;
  notFound: boolean = false;
  forbidden: boolean = false;
  corsError: boolean = false;
  unexpectedError: boolean = false;

  jobId: string | undefined;
  applicantData: any;

  companyLevel: any;
  company: any;
  postedJobs: any;
  ongoingPostedJobs: any;
  closedPostedJobs: any;

  gridView: boolean = true;

  constructor(
    private jobApplyService: JobApplyService,
    private employeeService: EmployeeService,
    private companyService: CompanyService,
    private router: Router,
    private route: ActivatedRoute,
    private alertService: AlertsService,
    private cookieService: AuthService) { }

  ngOnInit(): void {
    this.companyId = this.cookieService.organization();
    this.companyLevel = this.cookieService.level();
    this.getCompany(this.companyId)
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

  analyzeJob(jobId: any, jobTitle: any) {
    if (jobId && jobTitle) {
      const url = this.router.serializeUrl(
        this.router.createUrlTree(['/job-analysis', jobId,jobTitle])
      );
      window.open(url, '_blank');
    }
  }

  exportToCsv(jobId: any, applicants: any) {
    this.alertService.warningMessage('This feature is only available for verified companies', 'Warning');
  }

  getCompany(id: any) {
    this.loading = true;
    this.companyService.fetchFullCompany(id).subscribe(
      (data) => {
        this.company = data;
        this.postedJobs = data?.postedJobs[0];
        this.ongoingPostedJobs = this.postedJobs.postedJobs.filter((job: any) => !this.isExpired(job.expiryDate));
        this.closedPostedJobs = this.postedJobs.postedJobs.filter((job: any) => this.isExpired(job.expiryDate));
        this.loading = false;
      },
      (error: HttpErrorResponse) => {
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
      }
    )
  }

  isExpired(expiryDate: any) {
    return new Date(expiryDate) < new Date();
  }

  edit(id:any) {
    if (id){
      if (this.companyLevel == 3){
        this.router.navigate(['/pro/post-job'], {relativeTo: this.route, queryParams: {id: id}});
        return;
      } else if (this.companyLevel == 2){
        this.router.navigate(['/dashboard/post-job'], {relativeTo: this.route, queryParams: {id: id}});
        return;
      }
    }
  }

  reopen(id:any) {
    const cid: number = parseInt(this.companyLevel)
    if (cid <= 2){
      this.alertService.warningMessage('This feature is only available for verified companies', 'Warning');
      return;
    }
    if (id){
      this.router.navigate(['/pro/post-job'], {relativeTo: this.route, queryParams: {id: id}});
    }
  }

  close(id:any, job: any) {
    if (id){
      this.companyService.updatePostedJob(this.companyId, id,{
        ...job,
        expiryDate: new Date()
      }).subscribe((data) => {
        this.alertService.successMessage('Job closed successfully', 'Success');
        this.getCompany(this.companyId)
        location.reload();
      }, (error: HttpErrorResponse) => {
        this.alertService.errorMessage('Job closing failed', 'Error');
      })
    }
  }

  deleteJobPost(id:any) {
    if (id){
      this.companyService.deletePostedJob(this.companyId, id).subscribe((data) => {
        this.alertService.successMessage('Job deleted successfully', 'Success');
        this.getCompany(this.companyId);
        location.reload();
      }, (error: HttpErrorResponse) => {
        this.alertService.errorMessage('Job deletion failed', 'Error');
      })
    }
  }

  changeView() {
    this.gridView = !this.gridView
  }

  getApplicants(id: any) {
    let applicantsCont = 0;
    this.jobApplicants.forEach(applicants => {
      if (applicants.jobId == id) {
        applicantsCont = applicants.applicants.length;
      }
    })

    return applicantsCont
  }

  sortJobs(sortBy: string) {
    this.postedJobs.postedJobs.sort((a: any, b: any) => {
      if (sortBy === 'asc') {
        return new Date(a.datePosted).getTime() - new Date(b.datePosted).getTime();
      } else if (sortBy === 'desc') {
        return new Date(b.datePosted).getTime() - new Date(a.datePosted).getTime();
      } else {
        return a.title.localeCompare(b.title);
      }
    })
  }
}
