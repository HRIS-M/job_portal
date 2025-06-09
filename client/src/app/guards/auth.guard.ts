import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot} from '@angular/router';
import {AuthService} from "../services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {

  constructor(private cookieService: AuthService) {}

  async canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    const initialized = await this.cookieService.initSSO();

    const userId = this.cookieService.userID();
    const refreshToken = this.cookieService.isRefreshToken();

    if (initialized && userId && refreshToken) {
      return true;
    } else {
      this.cookieService.redirectToLogin();
      return false;
    }
  }

}
