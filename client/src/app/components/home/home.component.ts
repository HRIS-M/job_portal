import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {ValueIncrementService} from "../../services/value-increment.service";
import {EmployeeService} from "../../services/employee.service";
import {AuthService} from "../../services/auth.service";
import {ToastrService} from "ngx-toastr";
import {Observable, tap} from "rxjs";
import {CompanyService} from "../../services/company.service";
import {AlertsService} from "../../services/alerts.service";
import {GoogleAuthService} from "../../services/google-auth.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {
  @ViewChild('achievementsSection') achievementsSection!: ElementRef;

  companyDataStore: any;
  filteredCompanies: any[] = [];
  jobCounts: { [key: string]: number } = {};

  jobAdDataStore: any[] = [];
  filteredJobs: any[] = [];

  jobSearch: string = '';
  locationSearch: string = '';

  webDeveloperJobs: number = 0;
  graphicDesignerJobs: number = 0;
  dataEntryOperatorJobs: number = 0;
  businessDevelopmentJobs: number = 0;

  jobsAch: number = 1548;
  branchesAch: number = 25;
  countriesAch: number = 6;
  jobsAchValue: number = 0;
  branchesAchValue: number = 0;
  countriesAchValue: number = 0;
  observer!: IntersectionObserver;

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
              private valueIncrementService: ValueIncrementService,
              private employeeService: EmployeeService,
              private companyService: CompanyService,
              private cookieService: AuthService,
              private googleAuthService: GoogleAuthService,
              private alertService: AlertsService,
              private toastr: ToastrService) {
  }

  async ngOnInit(): Promise<any> {
    if (window.location.hash) {
      this.googleAuthService.handleRedirectCallback();
    }
    this.employeeId = this.cookieService.userID();
    await this.getEmployee(this.employeeId).subscribe((data) => {

    });
    await this.getAllCompanies().subscribe((data) => {
      this.filteredCompanies = this.companyDataStore;
      this.sortCompaniesByType();
      this.prefetchJobCounts();
      this.getAllJobs();
    });
  }

  ngAfterViewInit() {
    const icons = document.querySelectorAll('.material-icons');
    icons.forEach((icon) => {
      icon.setAttribute('translate', 'no');
    });
  }

  getEmployee(id: any): Observable<any> {
    return this.employeeService.fetchFullEmployee(id).pipe(
      tap((data) => {
        this.employee = data;
        this.userSavedIds = this.employee.employee.savedJobs.map((job: any) => job.jobId);
      })
    )
  }

  getAllJobs() {
    this.companyService.fetchAllPostedJobs().subscribe((data) => {
      const uniqueJobsMap = new Map(); // Create a map to store unique jobs by their ID or another unique property

      data.forEach((company: any) => {
        company.postedJobs.forEach((job: any) => {
          job.companyName = company.companyName;
          job.companyLogo = company.companyLogo;
          job.companyLevel = company.companyLevel;

          if (!uniqueJobsMap.has(job.id)) {
            uniqueJobsMap.set(job.id, job); // Add the job to the map if not already added
          }
        });
      });

      // Convert the map back to an array and update jobAdDataStore
      this.jobAdDataStore = Array.from(uniqueJobsMap.values());
    });
  }

  filterJobsAds(): any[] {
    this.filteredJobs = this.jobAdDataStore.filter((job: any) => job.title !== null && new Date(job.expiryDate).getTime() > new Date().getTime());
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

  getAllCompanies(): Observable<any> {
    this.loading = true;
    return this.companyService.fetchCompanies().pipe(
      tap(data => {
        this.companyDataStore = data;
        this.loading = false;
      })
    )
  }

  sortCompaniesByType(): void {
    this.filteredCompanies?.sort((a, b) => {
      const order: any = {'4': 1, '3': 2, '2': 3};

      // Sort by the defined order (premium first, then pro, then free)
      return order[a.companyLevel] - order[b.companyLevel];
    });
  }

  prefetchJobCounts() {
    // Loop through all companies and fetch the job counts once
    this.filteredCompanies?.forEach(company => {
      this.companyService.fetchPostedJobsById(company.id).subscribe(data => {
        this.jobCounts[company.id] = data[0]?.postedJobs.length || 0; // Default to 0 if no jobs found
      });
    });
  }

  getJobCount(companyId: string): number {
    return this.jobCounts[companyId] ?? 0; // Return 0 if the count is not yet available
  }

  setupIntersectionObserver() {
    this.observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Element is in view, start the animation
          this.incrementJobsValue(this.jobsAch, 0);
          this.incrementBranchesValue(this.branchesAch, 50);
          this.incrementCountriesValue(this.countriesAch, 100);
          // Once the animation has started, we can stop observing this element
          observer.unobserve(entry.target);
        }
      });
    }, {threshold: 0.2});

    // Start observing the achievements section
    if (this.achievementsSection) {
      this.observer.observe(this.achievementsSection.nativeElement);
    }
  }

  moveToRegister() {
    this.router.navigate(['/register'], {queryParams: {from: 'companies'}});
  }

  makeSearchQuery() {
    if (this.jobSearch === '' && this.locationSearch === '') {
      this.router.navigate(['/job']);
      return;
    } else if (this.jobSearch === '') {
      this.router.navigate(['/job'], {queryParams: {locationSearch: this.locationSearch}});
      return;
    } else if (this.locationSearch === '') {
      this.router.navigate(['/job'], {queryParams: {jobSearch: this.jobSearch}});
      return;
    } else {
      this.router.navigate(['/job'], {queryParams: {jobSearch: this.jobSearch, locationSearch: this.locationSearch}});
      return;
    }
  }

  filterJobs(): any[] {
    this.webDeveloperJobs = this.jobAdDataStore?.filter((item: any) => item.title?.toLowerCase().trim() === 'web developer').length;
    this.graphicDesignerJobs = this.jobAdDataStore?.filter((item: any) => item.title?.toLowerCase().trim() === 'graphic designer').length;
    this.dataEntryOperatorJobs = this.jobAdDataStore?.filter((item: any) => item.title?.toLowerCase().trim() === 'data entry operator').length;
    this.businessDevelopmentJobs = this.jobAdDataStore?.filter((item: any) => item.title?.toLowerCase().trim() === 'business development').length;

    return [
      {
        webDeveloperJobs: this.webDeveloperJobs,
        graphicDesignerJobs: this.graphicDesignerJobs,
        dataEntryOperatorJobs: this.dataEntryOperatorJobs,
        businessDevelopmentJobs: this.businessDevelopmentJobs
      }
    ]
  }

  incrementJobsValue(targetValue: number, interval: number) {
    this.valueIncrementService.incrementValue(targetValue, value => {
      this.jobsAchValue = value;
    }, interval);
  }

  incrementBranchesValue(targetValue: number, interval: number) {
    this.valueIncrementService.incrementValue(targetValue, value => {
      this.branchesAchValue = value;
    }, interval);
  }

  incrementCountriesValue(targetValue: number, interval: number) {
    this.valueIncrementService.incrementValue(targetValue, value => {
      this.countriesAchValue = value;
    }, interval);
  }

  saveFav(id: string) {
    if (this.employeeId == null) {
      this.warningMessage('Please Login First to Save Jobs', 'Reminder');
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
    if (this.employeeId == null) {
      this.warningMessage('Please Login First to Save Jobs', 'Reminder');
      return;
    }
    this.employeeService.removeFavJobs(this.employeeId, id).subscribe((data) => {
      this.getEmployee(this.employeeId);
      this.successMessage('Job Removed Successfully', 'Success');
    }, (error: any) => {
      this.errorMessage('Something went wrong. Please try again', 'Error');
    });
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
}
