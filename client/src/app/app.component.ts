import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {ThemeService} from "./services/theme.service";
import {NavigationEnd, Router} from "@angular/router";
import {LockScreenComponent} from "./components/lock-screen/lock-screen.component";
import {LoginComponent} from "./components/login/login.component";
import {RegisterComponent} from "./components/register/register.component";
import {ResetPasswordComponent} from "./components/reset-password/reset-password.component";
import {FreeDashboardComponent} from "./components/dashboards/free/free-dashboard/free-dashboard.component";
import {ProDashboardComponent} from "./components/dashboards/pro/pro-dashboard/pro-dashboard.component";
import {commonSearchResults} from "./shared/data-store/common-search-results";
import {AuthService} from "./services/auth.service";
import {HttpErrorResponse} from "@angular/common/http";
import {EmployeeService} from "./services/employee.service";
import {CredentialService} from "./services/credential.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AlertsService} from "./services/alerts.service";
import {FileUploadService} from "./services/file-upload.service";
import {ReportIssueService} from "./services/report-issue.service";
import {CommonService} from "./services/common/common.service";
import {Utilities} from "./shared/utilities/utilities";
import {HomeComponent} from "./components/home/home.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('navbarNav') navbarNav: ElementRef | any;
  title = 'Talent Boozt -Unlock Your Future with the Perfect Job';

  showNavbar = true;
  showFooter = true;

  openSearchResults = false;
  commonSearchResults: any[] = commonSearchResults;
  filteredSearchResults: any[] = [];
  targetInput: any;

  employee: any;
  employeeId: any;
  employeeLevel: any;
  employeeType: any;

  downloadURL?: any;

  isTranslator: boolean = false;
  isUiSettings: boolean = false;
  showContacts: boolean = false;
  isSubscribe: boolean = false;
  loading: boolean = false;

  utilities = Utilities;

  newsLetterForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  })

  constructor(public themeService: ThemeService,
              private router: Router,
              private renderer: Renderer2,
              private employeeService: EmployeeService,
              private credentialsService: CredentialService,
              private fileUploadService: FileUploadService,
              private reportIssueService: ReportIssueService,
              private commonService: CommonService,
              private alertService: AlertsService,
              private cookieService: AuthService) {
  }

  ngOnInit() {
    this.employeeId = this.cookieService.userID();
    this.employeeLevel = this.cookieService.level();
    this.themeService.applyTheme();
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Logic to update active class based on the current route
        this.updateActiveClass();

        const mainBody = document.querySelector('.main-body');
        if (mainBody) {
          mainBody.scrollTop = 0;
        } else {
          window.scrollTo(0, 0);
        }
      }
    });

    this.getEmployee(this.employeeId);

    this.isSubscribe = this.cookieService.isNewsletter();

    if (sessionStorage.getItem('newsLatter') != 'true' && !this.isSubscribe) {
      setTimeout(() => {
        const model_open = document.getElementById('news_model_open_main');
        model_open?.click();
        sessionStorage.setItem('newsLatter', 'true');
      }, 10000)
    }
  }

  ngAfterViewInit() {
    const icons = document.querySelectorAll('.material-icons');
    icons.forEach((icon) => {
      icon.setAttribute('translate', 'no');
    });
  }

  ngOnDestroy() {
    this.removeUnwantedSession()
  }

  getEmployee(id: any) {
    this.employeeService.getEmployee(id).subscribe(
      (data) => {
        this.employee = data;
        this.credentialsService.fetchCredentialByEmployeeId(this.employeeId).subscribe(
          (data) => {
            this.employeeType = data?.role
          }
        )
      },
      (error: HttpErrorResponse) => {
        console.log(error)
      }
    );
  }

  updateActiveClass() {
    const currentRoute = this.router.url;

    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.remove('active');
    });

    const activeLink = document.querySelector(`.nav-link[href="${currentRoute}"]`);
    if (activeLink) {
      activeLink.classList.add('active');
    }
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }

  changeColorShading(color: string) {
    this.themeService.changeColorShading(color);
  }

  isActive(s: string) {
    return this.router.url === s;
  }

  collapseNavbar() {
    const navbar = this.navbarNav.nativeElement;
    if (navbar.classList.contains('show')) {
      this.renderer.removeClass(navbar, 'show');
    }
  }

  toggleCommonComponent(component: any) {
    if (component instanceof LockScreenComponent) {
      this.showNavbar = false;
      this.showFooter = false;
    } else if (component instanceof LoginComponent) {
      this.showNavbar = false;
      this.showFooter = false;
    } else if (component instanceof RegisterComponent) {
      this.showNavbar = false;
      this.showFooter = false;
    } else if (component instanceof ResetPasswordComponent) {
      this.showNavbar = false;
      this.showFooter = false;
    } else if (component instanceof FreeDashboardComponent) {
      this.showNavbar = false;
      this.showFooter = false;
    } else if (component instanceof ProDashboardComponent) {
      this.showNavbar = false;
      this.showFooter = false;
    } else if (component instanceof HomeComponent) {
      this.showFooter = false;
      this.showNavbar = true;
    } else {
      this.showNavbar = true;
      this.showFooter = true;
    }
  }

  filterSearchResults(): any[] {
    if (this.targetInput === undefined) {
      this.filteredSearchResults = this.commonSearchResults
    }
    return this.filteredSearchResults;
  }

  handleSearch(data: any) {
    this.openSearchResults = !this.openSearchResults;
    this.targetInput = data as HTMLInputElement;
    const value = this.targetInput.value
    if (value) {
      this.filteredSearchResults = this.commonSearchResults.filter((data: any) =>
        data.name.toLowerCase().includes(value.toLowerCase())
      );
    } else {
      this.filteredSearchResults = this.commonSearchResults;
    }
  }

  removeUnwantedSession() {
    sessionStorage.clear();
  }

  logout() {
    this.cookieService.logout()
    this.removeUnwantedSession()
    this.router.navigate(['/login']);
  }

  clickTranslate() {
    this.isTranslator = !this.isTranslator;
  }

  openUiSettings() {
    this.isUiSettings = !this.isUiSettings;
  }

  toggleContacts() {
    this.showContacts = !this.showContacts;
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
          const model_close = document.getElementById('news_model_close_main');
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
}
