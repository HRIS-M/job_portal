import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../../../services/auth.service";
import {EmployeeService} from "../../../../services/employee.service";
import {EmployeeAuthStateService} from "../../../../services/cacheStates/employee-auth-state.service";

@Component({
  selector: 'app-pro-dashboard',
  templateUrl: './pro-dashboard.component.html',
  styleUrls: ['./pro-dashboard.component.scss']
})
export class ProDashboardComponent implements AfterViewInit, OnInit {
  employeeProfile: any;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private employeeService: EmployeeService,
              public authState: EmployeeAuthStateService,
              private cookieService: AuthService) { }

  ngOnInit() {
    this.authState.employee$.subscribe(profile => {
      this.employeeProfile = profile;
    });
    if (!this.employeeProfile.employee.id || !this.employeeProfile.employee.companyId) {
      window.location.reload();
      return;
    }
  }

  ngAfterViewInit() {
    const icons = document.querySelectorAll('.material-icons');
    icons.forEach((icon) => {
      icon.setAttribute('translate', 'no');
    });
  }

  logout() {
    this.cookieService.logout()
    this.authState.clearUser();
    this.router.navigate(['/login']);
  }
}
