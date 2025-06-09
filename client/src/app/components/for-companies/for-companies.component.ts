import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {CompanyService} from "../../services/company.service";
import {Observable, tap} from "rxjs";
import {Utilities} from "../../shared/utilities/utilities";
import {PricingUtilities} from "../../shared/utilities/pricing.utilities";
import {ProductsUtilities} from "../../shared/utilities/products.utilities";
import {CartService} from "../../services/payment/cart.service";
import {WindowService} from "../../services/common/window.service";
import {Meta, Title} from "@angular/platform-browser";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-for-companies',
  templateUrl: './for-companies.component.html',
  styleUrls: ['./for-companies.component.scss']
})
export class ForCompaniesComponent implements OnInit, AfterViewInit {

  companyDataStore: any;
  filteredCompanies: any[] = [];
  paginatedCompanies: any[] = []; // List of companies to show on the current page
  currentPage: number = 1;
  itemsPerPage: number = 4;  // how many items per page
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

  isAllProductsVisible: boolean = false;
  maxProductsDisplayed: number = 2;

  serverError: boolean = false;
  notFound: boolean = false;
  forbidden: boolean = false;
  corsError: boolean = false;
  unexpectedError: boolean = false;

  utilities = Utilities;
  pricingUtilities = PricingUtilities;
  productsUtilities = ProductsUtilities;

  constructor(private windowService: WindowService,
              private router: Router,
              private cookieService: AuthService,
              private companyService: CompanyService,
              private meta: Meta, private title: Title,
              private cartService: CartService) { }

  async ngOnInit() : Promise<any> {
    this.title.setTitle('Talentboozt -Partner with Us');
    this.meta.addTags([
      { name: 'description', content: 'Talent Boozt empowers companies to overcome hiring challenges with customized ' +
          'solutions tailored to their unique needs. Our platform streamlines recruitment, offering user-friendly tools ' +
          'and resources to connect with top talent.' },
      { name: 'keywords', content: 'Drive Business Growth, Recruitment Simplified, Talent Solutions, Top, Talent Access, ' +
          'Diverse Candidate Pool, Hiring Made Easy, Customized Hiring Solutions, Recruitment Management System, ' +
          'HR Solutions, Personalized Hiring Support, Trusted Recruitment Partners, Partner Network, ' +
          'Comprehensive HR Tools, Business Hiring Support, Talent Acquisition Solutions, User-Friendly Hiring Platform, ' +
          'All-in-One Hiring Solution, HR Products, Accelerate Hiring, Contact Talent Boozt' }
    ]);
    // Initialize the pagination
    await this.getAllCompanies().subscribe((data) => {
      this.filteredCompanies = this.companyDataStore ? this.companyDataStore : data;
      this.sortCompaniesByType();
      this.totalPages = Math.ceil(this.companyDataStore?.length / this.itemsPerPage);
      this.updatePaginationRange();
      this.updatePaginatedCompanies();
      this.prefetchJobCounts();
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

  updatePaginatedCompanies() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedCompanies = this.filteredCompanies?.filter(data => data.name !== null && data.location !== null)?.slice(startIndex, endIndex);
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

  toggleAllProducts() {
    this.isAllProductsVisible = !this.isAllProductsVisible;
    if (this.isAllProductsVisible) {
      this.maxProductsDisplayed = Infinity;
    } else {
      this.maxProductsDisplayed = 2;
    }
  }

  gotoCart(cart: any, url: string) {
    this.cartService.addToCart(cart);
    if (url.includes('https://')){ //trigger only for free package
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
    } else {
      this.router.navigate([url]);
    }
  }
}
