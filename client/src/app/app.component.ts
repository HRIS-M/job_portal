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
import {ActivatedRoute, Router} from "@angular/router";
import {LockScreenComponent} from "./components/authenticating/lock-screen/lock-screen.component";
import {LoginComponent} from "./components/authenticating/login/login.component";
import {RegisterComponent} from "./components/authenticating/register/register.component";
import {ResetPasswordComponent} from "./components/authenticating/reset-password/reset-password.component";
import {FreeDashboardComponent} from "./components/dashboards/free/free-dashboard/free-dashboard.component";
import {ProDashboardComponent} from "./components/dashboards/pro/pro-dashboard/pro-dashboard.component";
import {commonSearchResults} from "./shared/data-store/common-search-results";
import {AuthService} from "./services/auth.service";
import {EmployeeService} from "./services/employee.service";
import {CredentialService} from "./services/credential.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AlertsService} from "./services/alerts.service";
import {FileUploadService} from "./services/file-upload.service";
import {ReportIssueService} from "./services/report-issue.service";
import {CommonService} from "./services/common/common.service";
import {Utilities} from "./shared/utilities/utilities";
import {HomeComponent} from "./components/home/home.component";
import {LoginService} from "./services/common/login.service";
import {WindowService} from "./services/common/window.service";
import {EmployeeAuthStateService} from "./services/cacheStates/employee-auth-state.service";

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
  isCookiesAccepted: boolean = false;
  loading: boolean = false;

  utilities = Utilities;

  newsLetterForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  })

  constructor(public themeService: ThemeService,
              private router: Router,
              private route: ActivatedRoute,
              private renderer: Renderer2,
              private employeeService: EmployeeService,
              private credentialsService: CredentialService,
              private fileUploadService: FileUploadService,
              private reportIssueService: ReportIssueService,
              private authStateService: EmployeeAuthStateService,
              private commonService: CommonService,
              private alertService: AlertsService,
              private loginService: LoginService,
              private windowService: WindowService,
              private cookieService: AuthService) {
  }

  async ngOnInit(): Promise<void> {
    if (
      this.windowService.nativeDocument &&
      this.windowService.nativeSessionStorage &&
      this.windowService.nativeLocalStorage
    ) {
      window.addEventListener('cookieConsentAccepted', async () => {
        await this.startApp();
      });

      if (this.isAcceptCookies()) {
        await this.startApp();

        this.acceptCookiesAndOpenNewsLetter();
      }
    }
  }

  async startApp() {
    this.fetchTokensFromLogin();

    this.route.queryParams.subscribe(params => {
      const platform = params['platform'] || 'jobPortal';
      const ref = params['ref'] || 'talentboozt';
      const promo = params['promo'] || 'no';
      this.cookieService.createPlatform(platform);
      this.cookieService.createReferer(ref);
      this.cookieService.createPromotion(promo);
    });

    try {
      await this.autoLogin();
      this.authStateService.initializeUser().subscribe();
    } catch {
      // Do nothing
    }

    this.employeeId = this.cookieService.userID();
    this.employeeLevel = this.cookieService.level();
    this.themeService.applyTheme();
  }

  ngAfterViewInit() {
    if(this.windowService.nativeDocument){
      const icons = document.querySelectorAll('.material-icons');
      icons.forEach((icon) => {
        icon.setAttribute('translate', 'no');
      });
    }

    if(this.isAcceptCookies())
      this.markAttendance()
  }

  ngOnDestroy() {
    this.removeUnwantedSession()
  }

  loadingScreen() {
    setTimeout(() => {
      const loadingScreen = document.getElementById('loading-screen');
      if (loadingScreen) {
        loadingScreen.style.display = 'none';
      }
    },1500);
    const appRoot = document.querySelector('app-root') as HTMLElement;
    if (appRoot) {
      appRoot.style.display = 'block';
    }
  }

  autoLogin(): Promise<boolean> {
    const alreadyInitialized = sessionStorage.getItem('sso-initialized');
    if (alreadyInitialized) {
      return Promise.resolve(true);
    }

    return new Promise((resolve, reject) => {
      this.commonService.getSession().subscribe({
        next: (userData) => {
          this.cookieService.createUserID(userData.employeeId);
          this.cookieService.createLevel(userData.userLevel);
          if (userData.userLevel == '2') {
            this.cookieService.createAdmin(userData.email);
          } else if (userData.userLevel == '3') {
            this.cookieService.createProAdmin(userData.email);
          }
          this.cookieService.unlock();
          userData.organizations?.forEach((organization: any) => {
            this.cookieService.createOrganizationID(organization.jobPortal || '');
          })
          this.commonService.getTokens(userData.email).subscribe((tokens) => {
            this.cookieService.createAuthToken(tokens.accessToken);
            this.cookieService.createRefreshToken(tokens.refreshToken);
            if (this.windowService.nativeSessionStorage)
              sessionStorage.setItem('sso-initialized', 'true');
            resolve(true);
          });
        },
        error: (err) => {
          this.alertService.successMessage('Claim your free account today!', 'Talent Boozt ✨');
          reject(err);
        }
      });
    });
  }

  fetchTokensFromLogin(): void {
    if (this.windowService.nativeWindow) {
      const rawQuery = window.location.search;
      const params = new URLSearchParams(rawQuery);

      const accessToken = params.get('auth');
      const refreshToken = params.get('reft');

      if (accessToken && refreshToken) {
        this.cookieService.createAuthToken(accessToken);
        this.cookieService.createRefreshToken(refreshToken);

        // Clean the URL to prevent re-triggering
        params.delete('auth');
        params.delete('reft');
        const newUrl = window.location.pathname + (params.toString() ? '?' + params.toString() : '');
        window.history.replaceState({}, '', newUrl);
      }
    }
  }

  markAttendance() {
    if (this.windowService.nativeDocument) {
      const meta = {
        referrer: this.cookieService.getReferer(),
        platform: this.cookieService.getPlatform(),
        promotion: this.cookieService.getPromotion(),
        provider: document.referrer,
        userAgent: navigator.userAgent,
        language: navigator.language,
        languages: navigator.languages.join(', '),  // A comma-separated string of preferred languages
        platformDetails: navigator.platform,
        hardwareConcurrency: navigator.hardwareConcurrency,  // Number of logical processor cores
        deviceMemory: 0,  // Available memory in GB
        cookiesEnabled: navigator.cookieEnabled,  // Whether cookies are enabled
        onlineStatus: navigator.onLine,  // Whether the browser is online
        location: { latitude: 0, longitude: 0 },
      };

      // If device memory is available, collect it
      if ("deviceMemory" in navigator) {
        meta.deviceMemory = navigator.deviceMemory as number;
      }

      // If geolocation is available and allowed, collect it
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            meta.location = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            };
            this.recordLogin(meta);  // Continue the login process with geolocation
          },
          (error) => {
            console.error("Geolocation permission denied or failed", error);
            this.recordLogin(meta);  // Proceed with the login process even if geolocation fails
          }
        );
      } else {
        this.recordLogin(meta);  // Proceed without geolocation if not available
      }
    }
  }

  private recordLogin(meta: any) {
    if (this.employeeId) {
      this.loginService.recordLogin(this.employeeId, meta).subscribe(data => {
        this.alertService.successMessage('Good to see you back :)', 'Welcome');
      }, error => {
        // Handle error (maybe show an alert to the user)
      });
    } else {
      this.loginService.recordLogin('unknown', meta).subscribe(data => {
        this.alertService.successMessage('Hey there :)', 'Welcome');
      }, error => {
        // Handle error (maybe show an alert to the user)
      });
    }
  }

  acceptCookiesAndOpenNewsLetter() {
    this.isSubscribe = this.cookieService.isNewsletter();
    // if (this.cookieService.isCookiesAccepted()) {
    //   this.isCookiesAccepted = true;
    // }

    if (sessionStorage.getItem('newsLatter') != 'true' && !this.isSubscribe) {
      setTimeout(() => {
        const model_open = document.getElementById('news_model_open_main');
        model_open?.click();
        sessionStorage.setItem('newsLatter', 'true');
      }, 15000)
    }
  }

  isAcceptCookies() {
    if (this.windowService.nativeLocalStorage) {
      return localStorage.getItem('TB_COOKIES_ACCEPTED') === 'true';
    }
    return false;
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }

  changeColorShading(color: string) {
    this.themeService.changeColorShading(color);
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
      this.showNavbar = false;
    } else {
      this.showNavbar = true;
      this.showFooter = true;
    }
  }

  removeUnwantedSession() {
    if (this.windowService.nativeSessionStorage) {
      sessionStorage.clear();
    }
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
          if (this.windowService.nativeDocument) {
            const model_close = document.getElementById('news_model_close_main');
            model_close?.click();
          }
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

  acceptCookies() {
    this.cookieService.acceptAllCookies();
    this.isCookiesAccepted = true;
  }
}
