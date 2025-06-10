import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import { HttpErrorResponse } from "@angular/common/http";
import {CompanyService} from "../../services/company.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CommonService} from "../../services/common/common.service";
import {AlertsService} from "../../services/alerts.service";
import {EmployeeService} from "../../services/employee.service";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-business-profile',
  templateUrl: './business-profile.component.html',
  styleUrls: ['./business-profile.component.scss']
})
export class BusinessProfileComponent implements OnInit, AfterViewInit{

  companyDataStore: any;
  filteredCompanyDataStore: any[] = [];
  socialsDataStore: any[] = [];
  filteredSocialsDataStore: any[] = [];
  postedJobsDataStore: any[] = [];
  filteredPostedJobsDataStore: any[] = [];
  companyId: any;
  companyType: any;
  relatedCompanies: any;

  loading: boolean = false;

  serverError: boolean = false;
  notFound: boolean = false;
  forbidden: boolean = false;
  corsError: boolean = false;
  unexpectedError: boolean = false;

  contactUsForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    subject: new FormControl('', [Validators.required]),
    message: new FormControl('', [Validators.required])
  })
  mailLoading: boolean = false;

  followingsIds: any[] = [];
  followBtn:boolean = true;
  myId: any;
  me: any;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private companyService: CompanyService,
              private employeeService: EmployeeService,
              private cookieService: AuthService,
              private commonService: CommonService,
              private alertService: AlertsService) { }

  ngOnInit(): void {
    this.myId = this.cookieService.userID();
    this.route.paramMap.subscribe(params => {
      this.companyId = params.get('id');
      this.getCompany(this.companyId)
      this.filterCompanyData();
      this.filterSocialsData();
      this.filterPostedJobsData();
    });
    if (this.myId) {
      this.getEmployee(this.myId);
    }
  }

  getCompany(id: any) {
    this.loading = true;
    this.companyService.fetchFullCompany(id).subscribe(
      (data) => {
        this.companyType = data?.company?.companyType
        this.companyDataStore = [data.company];
        this.postedJobsDataStore = [data.postedJobs];
        this.socialsDataStore = [data.socials];
        this.getCompaniesByType(this.companyType);
        this.sortCompaniesByType();
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

  getEmployee(id: any) {
    this.employeeService.clearCache();
    this.employeeService.fetchFullEmployee(id).subscribe(
      (data) => {
        this.me = data;
        if (data?.empFollowing && data?.empFollowing.length > 0) {
          this.followingsIds = data.empFollowing[0]?.followings?.map((following: any) => following?.followingId) || [];
        }
      },
      (error: HttpErrorResponse) => {
        return;
      }
    );
  }

  getCompaniesByType(companyType: any) {
    if (this.companyType) {
      this.companyService.getCompaniesByType(companyType).subscribe((data) => {
        this.relatedCompanies = data;
      }, (error) => {
        console.log(error)
      })
    }
  }

  sortCompaniesByType(): void {
    this.relatedCompanies?.sort((a: any, b: any) => {
      const order: any = { '4': 1, '3': 2, '2': 3 };

      // Sort by the defined order (premium first, then pro, then free)
      return order[a.companyLevel] - order[b.companyLevel];
    });
  }

  ngAfterViewInit() {
    const icons = document.querySelectorAll('.material-icons');
    icons.forEach((icon) => {
      icon.setAttribute('translate', 'no');
    });
  }

  filterCompanyData(): any[] {
    this.filteredCompanyDataStore = this.companyDataStore?.filter((data: any) => data.id === this.companyId);
    return this.filteredCompanyDataStore;
  }

  filterSocialsData(): any[] {
    this.filteredSocialsDataStore = this.socialsDataStore[0]?.filter((data: any) => data.companyId === this.companyId);
    return this.filteredSocialsDataStore;
  }

  filterPostedJobsData(): any[] {
    this.filteredPostedJobsDataStore = this.postedJobsDataStore[0]?.filter((data: any) => data.companyId === this.companyId);
    return this.filteredPostedJobsDataStore;
  }

  notExpired(date: any, postedDate: any) {
    return new Date(date).getTime() > new Date().getTime() && new Date(postedDate).getTime() <= new Date().getTime();
  }

  contact() {
    if (this.contactUsForm.valid) {
      if (this.companyDataStore[0]?.contactEmail) {
        this.mailLoading = true;
        this.commonService.personalContact({
          name: this.contactUsForm.get('name')?.value,
          fromEmail: this.contactUsForm.get('email')?.value,
          toEmail: this.companyDataStore[0]?.contactEmail,
          subject: this.contactUsForm.get('subject')?.value,
          message: this.contactUsForm.get('message')?.value
        }).subscribe((res: any) => {
          this.mailLoading = false;
          this.contactUsForm.reset();
          this.alertService.successMessage('Your message has been sent.', 'Contact Us');
        }, (err: any) => {
          this.mailLoading = false;
          this.alertService.errorMessage('Something went wrong. Please try again.', 'Contact Us');
        })
      } else {
        this.alertService.warningMessage('Sorry! this company is not provided a public email address.', 'Contact Us');
      }
    } else {
      this.alertService.errorMessage('Please fill in all the required fields.', 'Contact Us');
    }
  }

  viewProfile(id: any) {
    if (id) {
      this.router.navigate([`/business-profile/${id}`]);
      setTimeout(() => {
        window.location.reload();
      }, 500)
    }
  }

  follow(company: any) {
    if(!this.myId){
      this.alertService.warningMessage('Please Login First to Follow', 'Follow');
      return;
    }
    this.followingsIds.push(company?.id);
    this.followBtn = false;
    if (company) {
      this.employeeService.addFollowing(
        {
          employeeId: this.myId,
          followings: [{
            id: this.generateRandomId(),
            followingId: company?.id || null,
            followingName: company?.name || null,
            followingOccupation: company?.shortDescription || null,
            followingImage: company?.logo || null,
            followingLocation: company?.location || null
          }]
        }
      ).subscribe(data => {
        this.alertService.successMessage('You have followed ' + company?.name, 'Follow')
        this.followBtn = true;
      }, (error: any) => {
        this.alertService.errorMessage('Something went wrong. Please try again.', 'Follow')
        this.followBtn = true;
      })
    }
  }

  unfollow(company: any) {
    const index = this.followingsIds.indexOf(company?.id);
    this.followBtn = false;
    if (index > -1) {
      this.followingsIds.splice(index, 1);
    }
    if (company) {
      this.employeeService.deleteFollowing(this.myId, company?.id).subscribe(data => {
        this.getEmployee(this.myId)
        this.alertService.successMessage('You have unfollowed ' + company?.name, 'Unfollow')
        this.followBtn = true;
      }, (error: any) => {
        this.alertService.errorMessage('Something went wrong. Please try again.', 'Unfollow')
        this.followBtn = true;
      })
    }
  }

  generateRandomId(): string {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }
}
