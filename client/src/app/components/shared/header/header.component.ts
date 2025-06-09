import {Component, ElementRef, Renderer2, ViewChild} from '@angular/core';
import {Utilities} from "../../../shared/utilities/utilities";
import {ThemeService} from "../../../services/theme.service";
import {NavigationEnd, Router} from "@angular/router";
import {EmployeeService} from "../../../services/employee.service";
import {CredentialService} from "../../../services/credential.service";
import {AlertsService} from "../../../services/alerts.service";
import {AuthService} from "../../../services/auth.service";
import {commonSearchResults} from "../../../shared/data-store/common-search-results";
import {LinkedInAuthService} from "../../../services/authentication/linked-in-auth.service";
import {CommonService} from "../../../services/common/common.service";
import {EmployeeProfile} from "../../../shared/data-models/cache/EmployeeProfile.model";
import {EmployeeAuthStateService} from "../../../services/cacheStates/employee-auth-state.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @ViewChild('navbarNav') navbarNav: ElementRef | any;

  openSearchResults = false;
  commonSearchResults: any[] = commonSearchResults;
  filteredSearchResults: any[] = [];
  targetInput: any;

  utilities = Utilities;

  employeeProfile: EmployeeProfile | null = null;

  constructor(public themeService: ThemeService,
              private router: Router,
              private renderer: Renderer2,
              private employeeService: EmployeeService,
              private credentialsService: CredentialService,
              private commonService: CommonService,
              private linkedInAuthService: LinkedInAuthService,
              private alertService: AlertsService,
              public authState: EmployeeAuthStateService,
              private cookieService: AuthService) {
  }

  ngOnInit() {
    this.authState.employee$.subscribe(profile => {
      this.employeeProfile = profile;
    });
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
  }

  ngAfterViewInit() {
    const icons = document.querySelectorAll('.material-icons');
    icons.forEach((icon) => {
      icon.setAttribute('translate', 'no');
    });
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

  isActive(s: string) {
    return this.router.url === s;
  }

  collapseNavbar() {
    const navbar = this.navbarNav.nativeElement;
    if (navbar.classList.contains('show')) {
      this.renderer.removeClass(navbar, 'show');
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
    this.commonService.logout().subscribe(() => {
      this.cookieService.logout()
      this.removeUnwantedSession()
      this.authState.clearUser();
      this.linkedInAuthService.logoutFromLinkedIn().then(r => {});
      this.alertService.successMessage('You have been logged out successfully.', 'Success');
    });
  }

  login(profile: string) {
    const referrer = this.cookieService.getReferer();
    const platform = this.cookieService.getPlatform();
    const promo = this.cookieService.getPromotion();
    const aElm: HTMLAnchorElement = document.createElement('a');
    const currentUrl = window.location.origin + window.location.pathname;
    const seekerRedirectParams = new URLSearchParams({
      plat: platform,
      ref: referrer,
      prom: promo,
      rb: 'CANDIDATE',
      lv: '1',
    });
    const recruiterRedirectParams = new URLSearchParams({
      plat: platform,
      ref: referrer,
      prom: promo,
      rb: 'RECRUITER',
      lv: '2',
    });
    const shortRedirectParams = new URLSearchParams({
      plat: platform,
      ref: referrer,
      prom: promo,
    });
    if (profile === 'seeker'){
      aElm.href = `https://login.talentboozt.com/login?redirectUri=${currentUrl}?&${seekerRedirectParams.toString()}`;
    } else if (profile === 'recruiter'){
      aElm.href = `https://login.talentboozt.com/login?redirectUri=${currentUrl}?&${recruiterRedirectParams.toString()}`;
    } else {
      aElm.href = `https://login.talentboozt.com/login?redirectUri=${currentUrl}?&${shortRedirectParams.toString()}`;
    }
    aElm.target = '_self';
    aElm.click();
  }
}
