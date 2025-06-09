import {AfterViewInit, Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {JobApplyService} from "../../../services/job-apply.service";
import {FileUploadService} from "../../../services/file-upload.service";
import {countries} from "../../../shared/data-store/countries";
import {AlertsService} from "../../../services/alerts.service";
import {CompanyService} from "../../../services/company.service";
import {AuthService} from "../../../services/auth.service";
import { HttpErrorResponse } from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";
import {EmployeeService} from "../../../services/employee.service";

@Component({
  selector: 'app-job-apply',
  templateUrl: './job-apply.component.html',
  styleUrls: ['./job-apply.component.scss']
})
export class JobApplyComponent implements AfterViewInit, OnInit{

  countriesSet: any[] = countries

  employeeId: any;
  companyId: any;
  jobId: any;
  loading: boolean = false;

  serverError: boolean = false;
  notFound: boolean = false;
  forbidden: boolean = false;
  corsError: boolean = false;
  unexpectedError: boolean = false;

  downloadURL?: any;
  cvUploading: boolean = false;

  applyForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required]),
    location: new FormControl('', [Validators.required]),
    cover: new FormControl('')
  })

  constructor(private jobApplyService: JobApplyService,
              private fileUploadService: FileUploadService,
              private companyService: CompanyService,
              private employeeService: EmployeeService,
              private cookieService: AuthService,
              private route: ActivatedRoute,
              private alertService: AlertsService) {
  }

  ngOnInit(): void {
    this.employeeId = this.cookieService.userID();
    this.route.queryParamMap.subscribe(params => {
      this.companyId = params.get('companyId');
      this.jobId = params.get('jobId');
    })
  }

  ngAfterViewInit() {
    const icons = document.querySelectorAll('.material-icons');
    icons.forEach((icon) => {
      icon.setAttribute('translate', 'no');
    });
  }

  apply(companyId: any, jobId: any) {
    if (companyId === undefined || jobId === undefined) {
      this.alertService.errorMessage('Invalid request.', 'Error');
      return;
    }
    if (this.applyForm.invalid) {
      this.alertService.errorMessage('Please fill all the required(*) fields.', 'Error');
      return;
    }
    this.loading = true;
    this.jobApplyService.addApplicant(companyId, jobId, {
      id: this.generateRandomId(),
      employeeId: this.employeeId,
      name: this.applyForm.get('name')?.value,
      email: this.applyForm.get('email')?.value,
      phone: this.applyForm.get('phone')?.value,
      location: this.applyForm.get('location')?.value,
      resume: this.downloadURL,
      coverLetter: this.applyForm.get('cover')?.value,
      status: 'Applied',
      date: new Date()
    }).subscribe(() => {
      this.loading = false;
      this.applyForm.reset();
      this.setEmployeeJobStatus(jobId);
      this.alertService.successMessage('Successfully applied for the job.', 'Success');
    }, (error: HttpErrorResponse) => {
      if (error.status === 403) {
        this.forbidden = true;
      } else if (error.status === 404) {
        this.notFound = true;
      } else if (error.status === 500) {
        this.unexpectedError = true;
      } else if (error.status === 0) {
        this.corsError = true;
      } else {
        this.serverError = true;
      }
      this.loading = false;
    })
  }

  setEmployeeJobStatus(id: string) {
    if (this.employeeId == null) {
      return;
    }
    this.employeeService.editFavJobStatus(this.employeeId, {
      jobId: id,
      status: 'applied'
    }).subscribe((data) => {
    }, (error: any) => {
      console.error(error);
    });
  }

  uploadFile(event: any, filePath: string) {
    this.cvUploading = true;
    const file = event.target.files[0];
    const maxFileSize = 3 * 1024 * 1024;
    const allowedFileTypes = ['image/png', 'image/jpeg', 'application/pdf'];
    if (file) {
      if (file.size > maxFileSize) {
        this.alertService.warningMessage('File size exceeds the maximum limit of 3MB.', 'Warning');
        return;
      }
      if (!allowedFileTypes.includes(file.type)) {
        this.alertService.warningMessage('Only PNG, JPEG, and PDF files are allowed.', 'Warning');
        return;
      }
      this.loading = true;
      this.fileUploadService.uploadFile(filePath, file).subscribe(url => {
        this.loading = false;
        this.downloadURL = url;
        this.cvUploading = false;
        this.alertService.successMessage('Successfully uploaded resume.', 'Success');
      }, () => {
        this.loading = false;
        this.cvUploading = false;
        this.alertService.errorMessage('Failed to upload file. Please try again.', 'Error');
      });
    }
  }

  generateRandomId(): string {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }
}
