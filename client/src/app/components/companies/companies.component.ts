import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {CompanyService} from "../../services/company.service";
import { HttpErrorResponse } from "@angular/common/http";
import {Observable, tap} from "rxjs";
import {WindowService} from "../../services/common/window.service";
import {Meta, Title} from "@angular/platform-browser";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.scss']
})
export class CompaniesComponent implements OnInit, AfterViewInit{

  companyDataStore: any;
  filteredCompanies: any[] = [];
  paginatedCompanies: any[] = []; // List of companies to show on the current page
  currentPage: number = 1;
  itemsPerPage: number = 8;  // how many items per page
  totalPages: number = 0;
  pageLimit: number = 5;     // Maximum number of pagination buttons to show
  startPage: number = 1;
  endPage: number = 5;
  pages: number[] = [];

  targetInput1: any;
  targetInput2: any;

  isSearchResultNotFound: boolean = false;
  jobCounts: { [key: string]: number } = {};  // Cache job counts

  loading: boolean = false;

  serverError: boolean = false;
  notFound: boolean = false;
  forbidden: boolean = false;
  corsError: boolean = false;
  unexpectedError: boolean = false;

  constructor(private windowService: WindowService,
              private router: Router,
              private meta: Meta, private title: Title,
              private cookieService: AuthService,
              private companyService: CompanyService) { }

  async ngOnInit() : Promise<any> {
    this.title.setTitle('Talentboozt -Partners');
    this.meta.addTags([
      { name: 'description', content: 'We’re a dedicated team of HR Professional and Tech enthusiasts passionate about ' +
          'connecting people with opportunity and fulfilling human potential.' },
      { name: 'keywords', content: 'Talent Matching, Job Search Platform, Company Profiles, Find Employers, Hire Talent, ' +
          'Explore Opportunities, Recruitment Services, Global Jobs, Corporate Careers, Professional Growth, Job Portal, ' +
          'Post Job Openings, Local and, International Companies, Employment Solutions, Workforce Connections' }
    ]);
    // Initialize the pagination
    await this.getAllCompanies().subscribe((data) => {
      this.filteredCompanies = this.companyDataStore;
      this.sortCompaniesByType();
      this.totalPages = Math.ceil(this.companyDataStore?.length / this.itemsPerPage);
      this.updatePaginationRange();
      this.updatePaginatedCompanies();
      this.prefetchJobCounts();
    }, (error: HttpErrorResponse) => {
      if (error.status === 404) {
        this.notFound = true;
      } else if (error.status === 403) {
        this.forbidden = true;
      } else if (error.status === 0) {
        this.corsError = true;
      } else {
        this.unexpectedError = true;
      }
    });
  }

  ngAfterViewInit() {
    if (this.windowService.nativeDocument){
      const icons = (document as any).querySelectorAll('.material-icons');
      icons.forEach((icon: any) => {
        icon.setAttribute('translate', 'no');
      });
    }
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
      const order: any = { '4': 1, '3': 2, '2': 3 };

      // Sort by the defined order (premium first, then pro, then free)
      return order[a.companyLevel] - order[b.companyLevel];
    });
  }

  filterCompanies(): void {
    // Filter companies based on both inputs (title and location)
    this.filteredCompanies = this.companyDataStore.filter((data: any) => {
      const titleMatch = this.targetInput1 ? data.name?.toLowerCase().includes(this.targetInput1.toLowerCase()) : true;
      const locationMatch = this.targetInput2 ? data.location?.toLowerCase().includes(this.targetInput2.toLowerCase()) : true;
      return titleMatch && locationMatch;
    });

    this.isSearchResultNotFound = this.filteredCompanies.length === 0;

    this.totalPages = Math.ceil(this.filteredCompanies.length / this.itemsPerPage);
    this.updatePaginationRange();
    this.updatePaginatedCompanies();
  }

  // Cache job count to prevent repeated API calls
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

  handleCompanySearch(data: any): void {
    this.targetInput1 = data.value;
    this.filterCompanies();
  }

  handleLocationSearch(data: any): void {
    this.targetInput2 = data.value;
    this.filterCompanies();
  }

  updatePaginatedCompanies() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedCompanies = this.filteredCompanies?.filter(data => data.name !== null)?.slice(startIndex, endIndex);
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePaginationRange();
      this.updatePaginatedCompanies();
    }
  }

  updatePaginationRange() {
    if (this.currentPage <= this.pageLimit) {
      this.startPage = 1;
      this.endPage = Math.min(this.pageLimit, this.totalPages);
    } else if (this.currentPage + this.pageLimit - 1 <= this.totalPages) {
      this.startPage = this.currentPage;
      this.endPage = Math.min(this.currentPage + this.pageLimit - 1, this.totalPages);
    } else {
      this.startPage = this.totalPages - this.pageLimit + 1;
      this.endPage = this.totalPages;
    }
    this.pages = Array.from({ length: this.endPage - this.startPage + 1 }, (_, i) => i + this.startPage);
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
    aElm.href = aElm.href = `https://login.talentboozt.com/login?redirectUri=${currentUrl}?&${recruiterRedirectParams.toString()}`;
    aElm.target = '_self';
    aElm.click();
  }
}
