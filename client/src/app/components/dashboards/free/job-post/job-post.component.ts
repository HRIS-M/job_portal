import {AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import { HttpErrorResponse } from "@angular/common/http";
import {EmployeeService} from "../../../../services/employee.service";
import {AuthService} from "../../../../services/auth.service";
import {CompanyService} from "../../../../services/company.service";
import {jobCategories} from "../../../../shared/data-store/job-categories-data-store";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AlertsService} from "../../../../services/alerts.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FileUploadService} from "../../../../services/file-upload.service";
import {CanComponentDeactivate} from "../../../../guards/can-deactivate.guard";
import {UnloadService} from "../../../../services/common/unload.service";
import {CommonService} from "../../../../services/common/common.service";

declare var bootstrap: any;

@Component({
  selector: 'app-job-post',
  templateUrl: './job-post.component.html',
  styleUrls: ['./job-post.component.scss']
})
export class JobPostComponent implements AfterViewInit, OnInit, CanComponentDeactivate, OnDestroy {

  selectedCategory: any = 'Software Development and Engineering';
  selectedJobType: any = 'Backend Developer';
  categoriesDataStore: any = jobCategories;
  filteredCategories: any = [];
  filteredJobTypes: any = [];
  isOtherCategorySelected: boolean = false;
  isOtherJobTypeSelected: boolean = false;

  employee: any;
  employeeId: any; //66e5a9836f5a4f722e9e97cf || 66e31aa7217eb911ad764373
  company: any;
  companyId: any;
  companyLevel: any;
  jobId: any;
  loading: boolean = false;

  serverError: boolean = false;
  notFound: boolean = false;
  forbidden: boolean = false;
  corsError: boolean = false;
  unexpectedError: boolean = false;

  cname: any = '';
  cemail: any = '';
  cphone: any = '';
  chq: any = '';
  cLogo: any = '';
  formLocked: boolean = false;

  postedJobs: any[] = [];

  downloadURL?: any;

  commonErrorMsg = '';
  whitelistError = '';
  whitelistSuccess = '';
  whitelistRequestError = '';
  redirectError = '';

  jobPostForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    category: new FormControl('IT', [Validators.required]),
    jobType: new FormControl('Web Developer', [Validators.required]),
    salary: new FormControl(''),
    minSalary: new FormControl(''),
    maxSalary: new FormControl(''),
    totalOpenings: new FormControl('', [Validators.required]),
    ageRange: new FormControl('18-30'),
    employeeType: new FormControl('', [Validators.required]),
    locationType: new FormControl('', [Validators.required]),
    skills: new FormControl(''),
    qualifications: new FormControl(''),
    experience: new FormControl(''),
    requirements: new FormControl(''),
    education: new FormControl(''),
    responsibilities: new FormControl(''),
    offer: new FormControl(''),
    es: new FormControl('BSc', [Validators.required]),
    exs: new FormControl('0-2 years', [Validators.required]),
    address: new FormControl(''),
    country: new FormControl('', [Validators.required]),
    state: new FormControl('', [Validators.required]),
    postdate: new FormControl('', [Validators.required]),
    expdate: new FormControl(''),
    checkWhitelist: new FormControl(''),
    requestWhitelist: new FormControl(''),
    customUrl: new FormControl(''),
  })

  searchResults: any[] = [];
  targetInput: any;
  isResultFound: boolean = false;

  draftKey = 'jobPostDraft';

  constructor(private employeeService: EmployeeService,
              private cookieService: AuthService,
              private alertService: AlertsService,
              private route: ActivatedRoute,
              private fileUploadService: FileUploadService,
              private unloadService: UnloadService,
              private router: Router,
              private cdr: ChangeDetectorRef,
              private commonService: CommonService,
              private companyService: CompanyService) {
    this.jobPostForm.valueChanges.subscribe(() => {
      this.unloadService.setUnsavedChanges(this.jobPostForm.dirty);
    });
  }

  ngAfterViewInit() {
    const icons = document.querySelectorAll('.material-icons');
    icons.forEach((icon) => {
      icon.setAttribute('translate', 'no');
    });

    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
      return new bootstrap.Tooltip(tooltipTriggerEl);
    });
  }

  ngOnInit() {
    this.employeeId = this.cookieService.userID();
    this.companyId = this.cookieService.organization();
    this.companyLevel = this.cookieService.level();
    this.getEmployee(this.employeeId);
    this.getCompany(this.companyId);

    if (this.companyLevel <= 2) {
      this.jobPostForm.get('expdate')?.disable();
    } else {
      this.jobPostForm.get('expdate')?.enable();
    }

    this.route.queryParams.subscribe(params => {
      this.jobId = params['id'];
      if (this.jobId) {
        this.patchValues(this.jobId);
      }
    })
  }

  canDeactivate(): boolean {
    if (this.jobPostForm.dirty) {
      return confirm('You have unsaved changes. Do you really want to leave?');
    }
    return true;
  }

  ngOnDestroy() {
    this.unloadService.setUnsavedChanges(false);
  }

  onCategoryChange(): void {
    this.isOtherCategorySelected = this.selectedCategory === 'Other';
    this.isOtherJobTypeSelected = this.selectedCategory === 'Other';
    if (this.selectedCategory) {
      this.jobPostForm.get('category')?.setValue(this.selectedCategory);
    }
  }

  onJobTypeChange(): void {
    this.isOtherJobTypeSelected = this.selectedJobType === 'Other';
    if (this.selectedJobType) {
      this.jobPostForm.get('jobType')?.setValue(this.selectedJobType);
    }
  }

  getEmployee(id: any) {
    this.loading = true;
    this.employeeService.fetchFullEmployee(id).subscribe(
      (data) => {
        this.employee = data;
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
    );
  }

  getCompany(id: any) {
    this.loading = true;
    this.formLocked = true;
    if (id) {
      this.companyService.fetchFullCompany(id).subscribe(
        (data) => {
          this.company = data;
          this.cname = this.company?.company?.name;
          this.cemail = this.company?.company?.contactEmail;
          this.cphone = this.company?.company?.contactNumber;
          this.chq = this.company?.company?.location;
          this.cLogo = this.company?.company?.logo;
          if (this.cname && this.cemail && this.cphone && this.chq) {
            this.formLocked = false;
          }
          this.postedJobs = this.company?.postedJobs[0]?.postedJobs;
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
  }

  filterCategories() {
    return this.filteredCategories = this.categoriesDataStore;
  }

  filterJobTypes(selectedCategory: any) {
    return this.filteredJobTypes = this.categoriesDataStore.filter((category: any) => category.name === selectedCategory)[0]?.subCategories;
  }

  saveJobPost() {
    this.commonErrorMsg = '';
    this.redirectError = '';
    const customUrl = this.jobPostForm.get('customUrl')?.value;

    if (customUrl) {
      this.commonService.validateRedirectUrl(customUrl).subscribe(
        (data) => {
          if (!data) {
            this.redirectError = 'Invalid Redirect URL (Ex: https://www.example.com)';
            return;
          } else {
            this.proceedJobPosting()
          }
        },
        (error: HttpErrorResponse) => {
          if (error.status === 403) {
            this.redirectError = 'You don\'t have permission to create this redirect URL';
            return;
          }
        }
      )
    } else {
      this.proceedJobPosting()
    }
  }

  proceedJobPosting(){
    if (this.jobPostForm.invalid) {
      this.commonErrorMsg = 'This field is required';
      this.alertService.warningMessage('Please fill all required fields! (Starred with *)', 'Warning');
      return;
    }
    const postdate: any = this.jobPostForm.get('postdate')?.value;
    let expdate: any = this.jobPostForm.get('expdate')?.value;

    // If expdate is null or the control is disabled, set expdate to 10 days after postdate
    if (!expdate || this.jobPostForm.get('expdate')?.disabled) {
      const postdateObj = new Date(postdate);
      postdateObj.setDate(postdateObj.getDate() + 10);  // Add 10 days to postdate
      expdate = postdateObj.toISOString().split('T')[0];  // Format to YYYY-MM-DD
    }

    const postData = [{
      id: this.generateRandomId(),
      title: this.jobPostForm.get('title')?.value,
      description: this.jobPostForm.get('description')?.value,
      category: this.selectedCategory ? this.selectedCategory : this.jobPostForm.get('category')?.value,
      jobType: this.selectedJobType ? this.selectedJobType : this.jobPostForm.get('jobType')?.value,
      salary: this.jobPostForm.get('salary')?.value,
      minSalary: this.jobPostForm.get('minSalary')?.value,
      maxSalary: this.jobPostForm.get('maxSalary')?.value,
      totalOpenings: this.jobPostForm.get('totalOpenings')?.value,
      ageRange: this.jobPostForm.get('ageRange')?.value,
      employeeType: this.jobPostForm.get('employeeType')?.value,
      locationType: this.jobPostForm.get('locationType')?.value,
      skills: this.jobPostForm.get('skills')?.value,
      qualifications: this.jobPostForm.get('qualifications')?.value,
      experience: this.jobPostForm.get('experience')?.value,
      requirements: this.jobPostForm.get('requirements')?.value,
      education: this.jobPostForm.get('education')?.value,
      responsibilities: this.jobPostForm.get('responsibilities')?.value,
      offers: this.jobPostForm.get('offer')?.value,
      eduShortDesc: this.jobPostForm.get('es')?.value,
      exShortDesc: this.jobPostForm.get('exs')?.value,
      location: this.jobPostForm.get('country')?.value + ', ' + this.jobPostForm.get('state')?.value,
      jobBanner: this.downloadURL ? this.downloadURL : null,
      datePosted: postdate,
      expiryDate: expdate,
      popularityScore: 0,
      redirectUrl: this.jobPostForm.get('customUrl')?.value
    }]

    if (this.companyLevel === '2' && this.postedJobs){
      if (this.postedJobs[0]?.postedJobs?.length >= 2) {
        this.alertService.warningMessage('You Reached Maximum Job Post Limit. Upgrade to Add More!', 'Warning');
        return;
      }
    }

    if (this.companyLevel === '3' && this.postedJobs){
      if (this.postedJobs[0]?.postedJobs?.length >= 9) {
        this.alertService.warningMessage('You Reached Maximum Job Post Limit. Upgrade to Add More!', 'Warning');
        return;
      }
    }

    if (this.formLocked) {
      this.alertService.warningMessage('Form Locked! Complete main details on profile', 'Warning');
      return;
    }

    this.loading = true;
    this.companyService.addJobPost({
      companyId: this.companyId,
      companyName: this.cname,
      companyLogo: this.cLogo,
      companyLevel: this.cookieService.level(),
      postedJobs: postData
    }).subscribe(
      (data) => {
        this.loading = false;
        this.jobPostForm.reset();
        this.alertService.successMessage('Job Post Added Successfully', 'Success');
      },
      (error) => {
        this.loading = false;
        this.alertService.errorMessage('Unable to Add Job Post', 'Error');
      }
    )
  }

  patchValues(jobId: any) {
    this.companyService.getPostedJob(this.companyId, jobId).subscribe(
      (data) => {
        this.jobPostForm.get('title')?.setValue(data.title);
        this.jobPostForm.get('description')?.setValue(data.description);
        this.jobPostForm.get('category')?.setValue(data.category);
        this.jobPostForm.get('jobType')?.setValue(data.jobType);
        this.jobPostForm.get('salary')?.setValue(data.salary);
        this.jobPostForm.get('minSalary')?.setValue(data.minSalary);
        this.jobPostForm.get('maxSalary')?.setValue(data.maxSalary);
        this.jobPostForm.get('totalOpenings')?.setValue(data.totalOpenings);
        this.jobPostForm.get('ageRange')?.setValue(data.ageRange);
        this.jobPostForm.get('employeeType')?.setValue(data.employeeType);
        this.jobPostForm.get('locationType')?.setValue(data.locationType);
        this.jobPostForm.get('skills')?.setValue(data.skills);
        this.jobPostForm.get('qualifications')?.setValue(data.qualifications);
        this.jobPostForm.get('experience')?.setValue(data.experience);
        this.jobPostForm.get('requirements')?.setValue(data.requirements);
        this.jobPostForm.get('education')?.setValue(data.education);
        this.jobPostForm.get('responsibilities')?.setValue(data.responsibilities);
        this.jobPostForm.get('offer')?.setValue(data.offers);
        this.jobPostForm.get('es')?.setValue(data.eduShortDesc);
        this.jobPostForm.get('exs')?.setValue(data.exShortDesc);
        this.jobPostForm.get('country')?.setValue(data.location.split(',')[0]);
        this.jobPostForm.get('state')?.setValue(data.location.split(',')[1]);
        this.jobPostForm.get('postdate')?.setValue(data.datePosted);
        this.jobPostForm.get('expdate')?.setValue(data.expiryDate);
        this.jobPostForm.get('customUrl')?.setValue(data.redirectUrl);
        this.selectedCategory = data.category;
        this.selectedJobType = data.jobType;
      }
    )
  }

  updateJob(){
    this.commonErrorMsg = '';
    this.redirectError = '';
    this.loading = true;
    const customUrl = this.jobPostForm.get('customUrl')?.value;

    if (customUrl) {
      this.commonService.validateRedirectUrl(customUrl).subscribe(
        (data) => {
          if (!data) {
            this.redirectError = 'Invalid Redirect URL (Ex: https://www.example.com)';
            return;
          } else {
            this.proceedJobUpdating()
          }
        },
        (error: HttpErrorResponse) => {
          if (error.status === 403) {
            this.redirectError = 'You don\'t have permission to create this redirect URL';
            return;
          }
        }
      )
    } else {
      this.proceedJobUpdating()
    }
  }

  proceedJobUpdating(){
    if (this.jobPostForm.invalid) {
      this.commonErrorMsg = 'This field is required';
      this.loading = false;
      this.alertService.warningMessage('Please fill all required fields! (Starred with *)', 'Warning');
      return;
    }

    this.companyService.updatePostedJob(this.companyId, this.jobId, {
      id: this.jobId,
      title: this.jobPostForm.get('title')?.value,
      description: this.jobPostForm.get('description')?.value,
      category: this.selectedCategory ? this.selectedCategory : this.jobPostForm.get('category')?.value,
      jobType: this.selectedJobType ? this.selectedJobType : this.jobPostForm.get('jobType')?.value,
      salary: this.jobPostForm.get('salary')?.value,
      minSalary: this.jobPostForm.get('minSalary')?.value,
      maxSalary: this.jobPostForm.get('maxSalary')?.value,
      totalOpenings: this.jobPostForm.get('totalOpenings')?.value,
      ageRange: this.jobPostForm.get('ageRange')?.value,
      employeeType: this.jobPostForm.get('employeeType')?.value,
      locationType: this.jobPostForm.get('locationType')?.value,
      skills: this.jobPostForm.get('skills')?.value,
      qualifications: this.jobPostForm.get('qualifications')?.value,
      experience: this.jobPostForm.get('experience')?.value,
      requirements: this.jobPostForm.get('requirements')?.value,
      education: this.jobPostForm.get('education')?.value,
      responsibilities: this.jobPostForm.get('responsibilities')?.value,
      offers: this.jobPostForm.get('offer')?.value,
      eduShortDesc: this.jobPostForm.get('es')?.value,
      exShortDesc: this.jobPostForm.get('exs')?.value,
      location: this.jobPostForm.get('country')?.value + ', ' + this.jobPostForm.get('state')?.value,
      datePosted: this.jobPostForm.get('postdate')?.value,
      expiryDate: this.jobPostForm.get('expdate')?.value,
      popularityScore: 0,
      redirectUrl: this.jobPostForm.get('customUrl')?.value
    }).subscribe(
      (data) => {
        this.loading = false;
        this.alertService.successMessage('Job Post Updated Successfully', 'Success');
      },
      (error) => {
        this.loading = false;
        this.alertService.errorMessage('Unable to Update Job Post', 'Error');
      }
    )
  }

  generateRandomId(): string {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }

  uploadFile(event: any, filePath: string) {
    const file = event.target.files[0];
    const maxFileSize = 1.5 * 1024 * 1024;
    const allowedFileTypes = ['image/png', 'image/jpeg', 'application/pdf'];
    if (file) {
      if (file.size > maxFileSize) {
        this.alertService.warningMessage('File size exceeds the maximum limit of 1.5MB.', 'Warning');
        return;
      }
      if (!allowedFileTypes.includes(file.type)) {
        this.alertService.warningMessage('Only PNG and JPEG files are allowed.', 'Warning');
        return;
      }
      this.loading = true;
      this.fileUploadService.uploadFile(filePath, file).subscribe(url => {
        this.loading = false;
        this.downloadURL = url;
        this.alertService.successMessage('Successfully uploaded banner.', 'Success');
      }, () => {
        this.loading = false;
        this.alertService.errorMessage('Failed to upload file. Please try again.', 'Error');
      });
    }
  }

  handleSearch(data: any) {
    this.targetInput = data.value;

    if (this.targetInput) {
      this.isResultFound = true;
      this.searchResults = this.postedJobs.filter((data: any) => {
        return this.targetInput ? data.title?.toLowerCase().includes(this.targetInput.toLowerCase()) : true;
      });
    } else {
      this.isResultFound = false;
      this.searchResults = [];
    }

  }

  goBack() {
    if (this.companyLevel == 2) {
      this.router.navigate(['/dashboard/overview']);
    } else {
      this.router.navigate(['/pro/overview']);
    }
  }

  preview(){
    setTimeout(() => {
      const model = document.getElementById('preview_model_open');
      model?.click();
    }, 100);
  }

  filterJobData(): any[] {
    return [this.jobPostForm?.value];
  }

  saveDraft(): void {
    const formData = this.jobPostForm.value;
    localStorage.setItem(this.draftKey, JSON.stringify(formData));
    this.jobPostForm.reset();
    this.alertService.successMessage('Draft saved successfully!', 'Success');
  }

  loadDraft(): void {
    const draft = localStorage.getItem(this.draftKey);
    if (draft) {
      this.jobPostForm.patchValue(JSON.parse(draft));
      this.jobPostForm.markAsPristine();
    } else {
      this.alertService.warningMessage('No draft found.', 'Warning');
    }
  }

  isDraftFound(){
    return !!localStorage.getItem(this.draftKey);
  }

  clearDraft(): void {
    localStorage.removeItem(this.draftKey);
    this.jobPostForm.reset();
  }

  downloadSampleBanner() {
    const imageUrl = 'https://firebasestorage.googleapis.com/v0/b/sparkc-ad442.appspot.com/o/talentboozt%2Fpublic%2Fbanner_size.jpg?alt=media&token=6db5aeaf-75dd-409b-98f0-91a32e31c172';
    const link = document.createElement('a');
    link.href = imageUrl;
    link.target = '_blank';
    link.download = 'sample_banner.png';
    link.click();
  }

  checkWhitelist() {
    const domain = this.jobPostForm.get('checkWhitelist')?.value;

    if (domain){
      this.commonService.getByActiveDomain(domain).subscribe(
        (data) => {
          if (data) {
            this.whitelistSuccess = 'Your Domain already whitelisted';
            this.whitelistError = '';
          } else {
            this.whitelistSuccess = '';
            this.whitelistError = 'Your domain is not whitelisted. Request for whitelisting';
          }
        }
      )
    } else {
      this.whitelistSuccess = '';
      this.whitelistError = 'Add Your Domain to check (www.domain.com)';
    }
  }

  requestWhitelist() {
    const domain = this.jobPostForm.get('requestWhitelist')?.value;

    if (domain){
      this.commonService.getWhitelistByDomainName(domain).subscribe(
        (data) => {
          if (data) {
            this.whitelistRequestError = 'Your Domain already whitelisted or Request being processing';
          } else {
            this.commonService.addWhitelist({
              domain: domain,
              requestBy: this.employee?.employee?.email || 'Anonymous',
              active: false
            }).subscribe(
              (data) => {
                if (data) {
                  this.alertService.successMessage('We received your request and will get back to you soon', 'Success');
                } else {
                  this.whitelistRequestError = 'Something went wrong. Check domain and try again (www.domain.com)';
                }
              },
              error => {
                this.whitelistSuccess = '';
                this.whitelistError = 'Something went wrong. Check domain and try again (www.domain.com)';
              }
            )
          }
        }
      )
    }
  }
}
