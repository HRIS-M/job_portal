import {Component, ElementRef, Renderer2, ViewChild} from '@angular/core';
import {Utilities} from "../../../shared/utilities/utilities";
import {ThemeService} from "../../../services/theme.service";
import {NavigationEnd, Router} from "@angular/router";
import {EmployeeService} from "../../../services/employee.service";
import {CredentialService} from "../../../services/credential.service";
import {AlertsService} from "../../../services/alerts.service";
import {AuthService} from "../../../services/auth.service";
import {commonSearchResults} from "../../../shared/data-store/common-search-results";
import { HttpErrorResponse } from "@angular/common/http";
import {LinkedInAuthService} from "../../../services/authentication/linked-in-auth.service";
import {CommonService} from "../../../services/common/common.service";

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

  employee: any;
  employeeId: any;
  employeeLevel: any;
  employeeType: any;
  isTokenFound: boolean = false;

  utilities = Utilities;

  constructor(public themeService: ThemeService,
              private router: Router,
              private renderer: Renderer2,
              private employeeService: EmployeeService,
              private credentialsService: CredentialService,
              private commonService: CommonService,
              private linkedInAuthService: LinkedInAuthService,
              private alertService: AlertsService,
              private cookieService: AuthService) {
  }

  ngOnInit() {
    this.employeeId = this.cookieService.userID();
    this.employeeLevel = this.cookieService.level();
    this.isTokenFound = this.cookieService.isRefreshToken();
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

    if (this.employeeId){
      this.getEmployee(this.employeeId);
    }
  }

  ngAfterViewInit() {
    const icons = document.querySelectorAll('.material-icons');
    icons.forEach((icon) => {
      icon.setAttribute('translate', 'no');
    });
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
      this.linkedInAuthService.logoutFromLinkedIn().then(r => {});
      this.alertService.successMessage('You have been logged out successfully.', 'Success');
    });
  }

  login(profile: string) {
    const referrer = this.cookieService.getReferer();
    const platform = this.cookieService.getPlatform();
    const promo = this.cookieService.getPromotion();
    const aElm: HTMLAnchorElement = document.createElement('a');
    if (profile === 'seeker'){
      aElm.href = 'https://login.talentboozt.com/login?redirectUri='+window.location.href+'?&plat='+platform+'&ref='+referrer+'&prom='+promo+'&rb=candidate&lv=1';
    } else if (profile === 'recruiter'){
      aElm.href = 'https://login.talentboozt.com/login?redirectUri='+window.location.href+'?&plat='+platform+'&ref='+referrer+'&prom='+promo+'&rb=employer&lv=2';
    } else {
      aElm.href = 'https://login.talentboozt.com/login?redirectUri='+window.location.href+'?&plat='+platform+'&ref='+referrer+'&prom='+promo;
    }
    aElm.target = '_self';
    aElm.click();
  }
}
