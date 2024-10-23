import {AfterViewInit, Component, ElementRef, NgZone, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {ValueIncrementService} from "../../services/value-increment.service";
import {EmployeeService} from "../../services/employee.service";
import {AuthService} from "../../services/auth.service";
import {ToastrService} from "ngx-toastr";
import {Observable, tap} from "rxjs";
import {CompanyService} from "../../services/company.service";
import {AlertsService} from "../../services/alerts.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CommonService} from "../../services/common/common.service";
import {Utilities} from "../../shared/utilities/utilities";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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

  jobsAch: number = 0; // available jobs now
  branchesAch: number = 0; // companies
  countriesAch: number = 2;
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

  isSubscribed: boolean = false;

  utilities = Utilities;

  newsLetterForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  })

  constructor(private router: Router,
              private valueIncrementService: ValueIncrementService,
              private employeeService: EmployeeService,
              private companyService: CompanyService,
              private cookieService: AuthService,
              private alertService: AlertsService,
              private commonService: CommonService,
              private ngZone: NgZone,
              private toastr: ToastrService) {
    // this.ngZone.runOutsideAngular(() => {
    //   gsap.registerPlugin(ScrollTrigger);
    // });
  }

  async ngOnInit(): Promise<any> {
    this.employeeId = this.cookieService.userID();
    await this.getEmployee(this.employeeId).subscribe((data) => {

    });
    await this.getAllCompanies().subscribe((data) => {
      this.filteredCompanies = this.companyDataStore;
      this.sortCompaniesByType();
      this.prefetchJobCounts();
      this.getAllJobs();
    });
    this.isSubscribed = this.cookieService.isNewsletter();
  }

  ngAfterViewInit() {
    // this.ngZone.runOutsideAngular(() => {
    //   this.initAnimations();
    // });
    this.setupIntersectionObserver()
    const icons = document.querySelectorAll('.material-icons');
    icons.forEach((icon) => {
      icon.setAttribute('translate', 'no');
    });
  }

  getEmployee(id: any): Observable<any> {
    return this.employeeService.fetchFullEmployee(id).pipe(
      tap((data) => {
        this.employee = data;
        this.userSavedIds = this.employee?.employee?.savedJobs?.map((job: any) => job.jobId);
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
      this.jobsAch = this.jobAdDataStore?.length || 0;
      localStorage.setItem('jobsAch', this.jobsAch.toString());
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
        this.companyDataStore = this.companyDataStore?.filter((data:any) => data.name !== null && data.shortDescription !== null || data.companyStory !== null);
        this.branchesAch = this.companyDataStore?.length || 0;
        localStorage.setItem('branchesAch', this.branchesAch.toString());
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
          this.incrementJobsValue(this.jobsAch, 100);
          this.incrementBranchesValue(this.branchesAch, 100);
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

  filterJobs(name: any): any {
    return this.jobAdDataStore?.filter((item: any) => item.title?.toLowerCase().trim() === name.toLowerCase().trim()).length;
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

  onJobSavedOrRemoved() {
    this.getEmployee(this.employeeId);
  }

  subscribeNewsLatter() {
    if (this.newsLetterForm.valid) {
      this.loading = true;
      const email = this.newsLetterForm.get('email')?.value;
      if (email) {
        this.commonService.subscribeNewsLatter(email).subscribe((data) => {
          this.alertService.successMessage('Email sent successfully.', 'Success');
          this.cookieService.newsletter();
          this.loading = false;
          this.newsLetterForm.reset();
          const model_close = document.getElementById('news_model_close');
          model_close?.click();
          return;
        }, (error) => {
          this.newsLetterForm.get('email')?.setValue('Error');
          this.alertService.errorMessage('Something went wrong. Please try again.', 'Error');
          this.loading = false;
        })
      }
    } else {
      this.alertService.errorMessage('Field is empty or invalid.', 'Error');
    }
  }

  openSubscribeModal() {
    if (this.isSubscribed){
      this.alertService.successMessage("You have already subscribed to our newsletter :)", "Subscribed!");
      return;
    } else {
      const model = document.getElementById('news_model_open');
      model?.click();
    }
  }

  // initAnimations(): void {
  //   gsap
  //     .timeline({
  //       scrollTrigger:{
  //         trigger:'.scrollDist',
  //         start:'0 0',
  //         end:'100% 100%',
  //         scrub:1
  //       }})
  //     .fromTo('.sky', {y:0},{y:-200}, 0)
  //     .fromTo('.cloud1', {y:100},{y:-800}, 0)
  //     .fromTo('.cloud2', {y:-150},{y:-500}, 0)
  //     .fromTo('.cloud3', {y:-50},{y:-650}, 0)
  //     .fromTo('.mountBg', {y:-10},{y:-100}, 0)
  //     .fromTo('.mountMg', {y:-30},{y:-250}, 0)
  //     .fromTo('.mountFg', {y:-50},{y:-600}, 0)
  //
  //
  //   const arrowBtn = document.querySelector('#arrow-btn') as HTMLButtonElement
  //
  //   arrowBtn.addEventListener('mouseenter', ()=>{
  //     gsap.to('.arrow', {y:10, duration:0.8, ease:'back.inOut(3)', overwrite:'auto'})
  //   })
  //
  //   arrowBtn.addEventListener('mouseleave', ()=> {
  //     gsap.to('.arrow', {y:0, duration:0.5, ease:'power3.out', overwrite:'auto'})
  //   })
  //
  //   arrowBtn.addEventListener('click', ()=> {
  //     gsap.to(window, {scrollTo:innerHeight, duration:1.5, ease:'power1.inOut'})
  //   })
  // }

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
