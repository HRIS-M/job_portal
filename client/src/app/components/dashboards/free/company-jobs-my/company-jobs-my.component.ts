import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../../../services/auth.service";
import {EmployeeService} from "../../../../services/employee.service";
import {CompanyService} from "../../../../services/company.service";
import {AlertsService} from "../../../../services/alerts.service";
import { HttpErrorResponse } from "@angular/common/http";
import {Parser} from "@angular/compiler";

@Component({
  selector: 'app-company-jobs-my',
  templateUrl: './company-jobs-my.component.html',
  styleUrls: ['./company-jobs-my.component.scss']
})
export class CompanyJobsMyComponent implements AfterViewInit, OnInit{

  companyId: any;
  companyLevel: any;
  company: any;
  postedJobs: any;

  loading: boolean = false;

  serverError: boolean = false;
  notFound: boolean = false;
  forbidden: boolean = false;
  corsError: boolean = false;
  unexpectedError: boolean = false;
  constructor(private router: Router,
              private route: ActivatedRoute,
              private cookieService: AuthService,
              private employeeService: EmployeeService,
              private companyService: CompanyService,
              private alertService: AlertsService) { }

  ngOnInit() {
    this.companyId = this.cookieService.organization();
    this.companyLevel = this.cookieService.level();
    this.getCompany(this.companyId)
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

  isScheduled(postedDate: any) {
    return new Date(postedDate) > new Date();
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
}
