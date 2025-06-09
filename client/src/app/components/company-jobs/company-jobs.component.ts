import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {jobAdDataStrore} from "../../shared/data-store/JobAd-data-strore";
import { HttpErrorResponse } from "@angular/common/http";
import {CompanyService} from "../../services/company.service";
import {EmployeeService} from "../../services/employee.service";
import {AlertsService} from "../../services/alerts.service";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-company-jobs',
  templateUrl: './company-jobs.component.html',
  styleUrls: ['./company-jobs.component.scss']
})
export class CompanyJobsComponent implements OnInit, AfterViewInit{

  companyId: any;
  company: any;
  postedJobs: any;
  filteredJobs: any[] = [];

  employee: any;
  employeeId: any; //66e5a9836f5a4f722e9e97cf || 66e31aa7217eb911ad764373
  userSavedIds: any[] = [];

  loading: boolean = false;

  serverError: boolean = false;
  notFound: boolean = false;
  forbidden: boolean = false;
  corsError: boolean = false;
  unexpectedError: boolean = false;

  constructor(private router: Router,
              private companyService: CompanyService,
              private employeeService: EmployeeService,
              private alertService: AlertsService,
              private cookieService: AuthService) { }

  ngOnInit() {
    this.employeeId = this.cookieService.userID();
    this.companyId = this.router.url.split('/')[2];
    this.getCompany(this.companyId)
    this.getEmployee(this.employeeId);
  }

  ngAfterViewInit() {
    const icons = document.querySelectorAll('.material-icons');
    icons.forEach((icon) => {
      icon.setAttribute('translate', 'no');
    });
  }

  getCompany(id: any) {
    this.loading = true;
    this.companyService.fetchFullCompany(id).subscribe(
      (data) => {
        this.company = data;
        this.postedJobs = data?.postedJobs[0];
        this.filteredJobs = this.postedJobs?.postedJobs.filter((job: any) => this.isExpired(job.expiryDate, job.datePosted));
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

  getEmployee(id: any) {
    this.employeeService.fetchFullEmployee(id).subscribe(
      (data) => {
        this.employee = data;
        this.userSavedIds = this.employee?.employee?.savedJobs?.map((job: any) => job.jobId);
      },
      (error: any) => {
        this.alertService.warningMessage('Please Login First to Apply Jobs', 'Reminder');
      }
    );
  }

  moveToRegister() {
    const referrer = this.cookieService.getReferer();
    const platform = this.cookieService.getPlatform();
    const promo = this.cookieService.getPromotion();
    const aElm: HTMLAnchorElement = document.createElement('a');
    const currentUrl = window.location.origin + window.location.pathname;
    const recruiterRedirectParams = new URLSearchParams({
      plat: platform,
      ref: referrer,
      prom: promo,
      rb: 'RECRUITER',
      lv: '2',
    });
    aElm.href = `https://login.talentboozt.com/login?redirectUri=${currentUrl}?&${recruiterRedirectParams.toString()}`;
    aElm.target = '_self';
    aElm.click();
  }

  saveFav(id: string) {
    if (this.employeeId == null) {
      this.alertService.warningMessage('Please Login First to Save Jobs', 'Reminder');
      return;
    }
    this.employeeService.saveFavJobs(this.employeeId, {
      jobId: id,
      status: 'saved'
    }).subscribe((data) => {
      this.getEmployee(this.employeeId);
      this.getCompany(this.companyId);
      this.alertService.successMessage('Job Saved Successfully', 'Success');
    }, (error: any) => {
      this.alertService.errorMessage('Something went wrong. Please try again', 'Error');
    });
  }

  removeFav(id: string) {
    if (this.employeeId == null) {
      this.alertService.warningMessage('Please Login First to Save Jobs', 'Reminder');
      return;
    }
    this.employeeService.removeFavJobs(this.employeeId, id).subscribe((data) => {
      this.getEmployee(this.employeeId);
      this.getCompany(this.companyId);
      this.alertService.successMessage('Job Removed Successfully', 'Success');
    }, (error: any) => {
      this.alertService.errorMessage('Something went wrong. Please try again', 'Error');
    });
  }

  isExpired(expiryDate: any, postedDate: any) {
    return new Date(expiryDate) > new Date() && new Date(postedDate) <= new Date();
  }
}
