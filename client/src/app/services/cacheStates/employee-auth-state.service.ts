import { Injectable } from '@angular/core';
import {BehaviorSubject, catchError, map, Observable, of, tap} from 'rxjs';
import {EmployeeProfile} from '../../shared/data-models/cache/EmployeeProfile.model';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {AuthService} from "../auth.service";

@Injectable({
  providedIn: 'root'
})
export class EmployeeAuthStateService {

  private _employeeSubject = new BehaviorSubject<EmployeeProfile | null>(null);
  employee$ = this._employeeSubject.asObservable();
  isLoggedIn$ = this.employee$.pipe(
    map(profile => !!profile?.employee?.id && this.cookieService.isRefreshToken())
  );

  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient, private cookieService: AuthService) {}

  /**
   * Initialize user from cookie (on app load)
   */
  initializeUser(): Observable<EmployeeProfile | null> {
    const employeeId = this.cookieService.userID();
    if (!employeeId) {
      this._employeeSubject.next(null);
      return of(null);
    }

    return this.http.get<EmployeeProfile>(`${this.baseUrl}/batch/async/getEmployee/${employeeId}`).pipe(
      tap(profile => this._employeeSubject.next(profile)),
      catchError(error => {
        console.error('[Auth] Failed to load employee profile', error);
        this._employeeSubject.next(null);
        return of(null);
      })
    );
  }

  /**
   * Initialize user from cookie/token, or clear it if invalid.
   */
  initializeFromCookie(employee: EmployeeProfile): void {
    if (this.cookieService.isRefreshToken()) {
      this._employeeSubject.next(employee);
    } else {
      this._employeeSubject.next(null);
    }
  }

  /**
   * Expose snapshot for sync usage
   */
  get isLoggedIn(): boolean {
    return !!this._employeeSubject.value && this.cookieService.isRefreshToken();
  }

  /**
   * Expose snapshot for sync usage
   */
  get currentUser(): EmployeeProfile | null {
    return this._employeeSubject.value;
  }

  /**
   * Manual refresh (e.g., after profile update)
   */
  refreshUser(): Observable<EmployeeProfile | null> {
    return this.initializeUser();
  }

  /**
   * Logout cleanup
   */
  clearUser() {
    this._employeeSubject.next(null);
  }

}
