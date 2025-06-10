import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ValueIncrementService} from "../../../services/value-increment.service";
import {EmployeeService} from "../../../services/employee.service";
import {AuthService} from "../../../services/auth.service";
import {ToastrService} from "ngx-toastr";
import {CompanyService} from "../../../services/company.service";
import {JobApplyService} from "../../../services/job-apply.service";
import { HttpErrorResponse } from "@angular/common/http";


@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.scss']
})
export class JobDetailsComponent implements OnInit, AfterViewInit, OnDestroy {

  jobDataStore: any[] = [];
  filteredJobs: any[] = [];
  filteredJobDataStore: any[] = [];
  jobPostId: any;
  jobPostTitle: any;
  companyName: any;
  jobExpiryDate: any;

  employee: any;
  employeeId: any; //66e5a9836f5a4f722e9e97cf || 66e31aa7217eb911ad764373
  employeeName: any;
  viewerId: any;
  companyId: any;
  userSavedIds: any[] = [];
  userAppliedIds: any[] = [];

  loading: boolean = false;

  serverError: boolean = false;
  notFound: boolean = false;
  forbidden: boolean = false;
  corsError: boolean = false;
  unexpectedError: boolean = false;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private valueIncrementService: ValueIncrementService,
              private employeeService: EmployeeService,
              private companyService: CompanyService,
              private jobApplyService: JobApplyService,
              private cookieService: AuthService,
              private toastr: ToastrService ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.jobPostId = params.get('id');
      this.employeeId = this.cookieService.userID();
      this.filterJobData();
      if (this.employeeId){
        this.getEmployee(this.employeeId);
      }
      if (this.jobPostId) {
        this.getAllJobs();
      }
    });
  }

  ngAfterViewInit() {
    const icons = document.querySelectorAll('.material-icons');
    icons.forEach((icon) => {
      icon.setAttribute('translate', 'no');
    });
    setTimeout(() => {
      this.addViewer();
    }, 1500);
  }

  ngOnDestroy() {
    sessionStorage.removeItem(`viewerId_${this.jobPostId}`);
  }

  getEmployee(id: any) {
    this.employeeService.fetchFullEmployee(id).subscribe(
      (data) => {
        this.employee = data;
        this.employeeName = this.employee.employee.firstname + ' ' + this.employee.employee.lastname;
        this.userSavedIds = this.employee.employee.savedJobs.filter((item: any) => item.status === 'saved').map((job: any) => job.jobId);
        this.userAppliedIds = this.employee.employee.savedJobs.filter((item: any) => item.status === 'applied').map((job: any) => job.jobId);
      },
      (error: any) => {
        this.warningMessage('Please Login First to Apply Jobs', 'Reminder');
      }
    );
  }

  getAllJobs() {
    this.companyService.fetchAllPostedJobs().subscribe((data) => {
      data.forEach((company: any) => {
        company.postedJobs.forEach((job: any) => {
          // Add company details to each job
          job.companyName = company.companyName;
          job.companyLogo = company.companyLogo;
          job.companyLevel = company.companyLevel;
          job.companyId = company.companyId;
          this.jobDataStore.push(job);
        });
      });
    },(error: HttpErrorResponse) => {
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

  filterJobsAds(): any[] {
    this.filteredJobs = this.jobDataStore.filter((job: any) => job.title !== null && job.title === this.jobPostTitle && job.id !== this.jobPostId && new Date(job.expiryDate) > new Date());
    if (this.filteredJobs.length === 0) {
      this.filteredJobs = this.jobDataStore.filter((job: any) => job.companyName === this.companyName && job.id !== this.jobPostId && new Date(job.expiryDate) > new Date());
    }
    this.sortJobsByType();
    return this.filteredJobs;
  }

  sortJobsByType(): void {
    this.filteredJobs?.sort((a, b) => {
      const order: any = {'4': 1, '3': 2, '2': 3};

      // Sort by the defined order (premium first, then pro, then free)
      return order[a.companyLevel] - order[b.companyLevel];
    });
  }

  filterJobData(): any[] {
    this.filteredJobDataStore = this.jobDataStore.filter((job: any) => job.id === this.jobPostId);
    this.jobPostTitle = this.filteredJobDataStore[0]?.title;
    this.companyName = this.filteredJobDataStore[0]?.companyName;
    this.companyId = this.filteredJobDataStore[0]?.companyId;
    this.jobExpiryDate = this.filteredJobDataStore[0]?.expiryDate;
    this.notFound = this.filteredJobDataStore.length === 0;
    return this.filteredJobDataStore;
  }

  addViewer() {
    const viewerSessionKey = `viewerId_${this.jobPostId}`;

    if (!sessionStorage.getItem(viewerSessionKey)) {
      this.viewerId = this.employeeId ? this.generateRandomId() : `anon_${this.generateRandomId()}`;
      sessionStorage.setItem(viewerSessionKey, this.viewerId);
    }

    this.jobApplyService.fetchJobViewerByJobId(this.jobPostId).subscribe((data: any) => {
      const existingViewers = data[0]?.viewers || [];
      const currentViewerId = sessionStorage.getItem(viewerSessionKey);

      const isViewerAlreadyPresent = existingViewers.some((viewer: any) => {
        return viewer.id === currentViewerId || (this.employeeId && viewer.employeeId === this.employeeId);
      });

      if (!isViewerAlreadyPresent) {
        const viewerData = {
          id: currentViewerId,
          employeeId: this.employeeId || 'Guest_' + this.generateRandomId(),  // Ensure unique anonymous ID
          name: this.employeeName || 'Guest',
          status: this.employeeName ? 'registered' : 'unregistered',
          date: new Date()
        };

        this.jobApplyService.addViewer(this.companyId, this.jobPostId, viewerData)
          .subscribe((response: any) => {
            // console.log('Viewer added');
          }, (error: any) => {
            console.error('Error adding viewer:', error);
          });
      }
    });
  }

  saveFav(id: string) {
    if (new Date(this.jobExpiryDate) < new Date()) {
      this.errorMessage('Job Expired', 'Error');
      return;
    }
    this.employeeService.saveFavJobs(this.employeeId, {
      jobId: id,
      status: 'saved'
    }).subscribe((data) => {
      this.getEmployee(this.employeeId);
      this.successMessage('Job Saved Successfully', 'Success');
    }, (error: any) => {
      this.errorMessage('Something went wrong. Please try again', 'Error');
    });
  }

  removeFav(id: string) {
    this.employeeService.removeFavJobs(this.employeeId, id).subscribe((data) => {
      this.getEmployee(this.employeeId);
      this.successMessage('Job Removed Successfully', 'Success');
    }, (error: any) => {
      this.errorMessage('Something went wrong. Please try again', 'Error');
    });
  }

  onJobSavedOrRemoved() {
    this.getEmployee(this.employeeId);
  }

  successMessage(msg: string, title: string) {
    this.toastr.success(msg, title, {
      progressBar: true,
      progressAnimation: 'increasing',
      closeButton: true,
    });
  }

  errorMessage(msg: string, title: string) {
    this.toastr.error(msg, title, {
      progressBar: true,
      progressAnimation: 'decreasing',
      closeButton: true,
    });
  }

  warningMessage(msg: string, title: string) {
    this.toastr.warning(msg, title, {
      progressBar: true,
      progressAnimation: 'decreasing',
    });
  }

  navigateToJobDetails(id:any) {
    this.router.navigate(['/job-details', id]);
    setTimeout(() => {
      window.location.reload();
    }, 500);
  }

  navigateToApplyJob(redirect: any) {
    if (new Date(this.jobExpiryDate) < new Date()) {
      this.errorMessage('Job Expired', 'Error');
      return;
    }
    if (redirect) {
      const anchorElement = document.createElement('a');
      anchorElement.href = redirect;
      anchorElement.target = '_blank';
      anchorElement.click();
    } else {
      this.router.navigate(['/job-apply'], {queryParams: {companyId: this.companyId, jobId: this.jobPostId}});
    }
  }

  generateRandomId() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }
}
