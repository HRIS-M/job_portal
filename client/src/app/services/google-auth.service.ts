import {Injectable, OnDestroy} from '@angular/core';
import {AuthConfig, OAuthService} from "angular-oauth2-oidc";
import {environment} from "../../environments/environment";
import {CredentialService} from "./credential.service";
import {Router} from "@angular/router";
import {AlertsService} from "./alerts.service";
import {AuthService} from "./auth.service";
import {from, Subject, takeUntil} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GoogleAuthService implements OnDestroy {

  private hasLoggedIn = false;
  private unsubscribe$ = new Subject<void>();

  googleAuthConfig: AuthConfig = environment.googleAuthConfig;
  constructor(
    private oauthService: OAuthService,
    private credentialService: CredentialService,
    private alertService: AlertsService,
    private cookieService: AuthService,
    private router: Router
  ) { }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  setOAuth(accessToken: string, idToken: string) {
    document.cookie = `access_token=${accessToken}; path=/; secure; SameSite=Strict`; // Removed HttpOnly
    document.cookie = `id_token=${idToken}; path=/; secure; SameSite=Strict`; // Removed HttpOnly
  }

  configureOAuth() {
    this.logToLocalStorage('Configuring OAuth with Google');
    this.oauthService.configure(this.googleAuthConfig);
    this.loadDiscoveryDocumentAndTryLogin();
  }

  loadDiscoveryDocumentAndTryLogin() {
    this.oauthService.loadDiscoveryDocument().then(() => {
      this.logToLocalStorage('Discovery document loaded successfully');
      this.oauthService.tryLogin({
        onTokenReceived: (context: any) => {
          if (!this.hasLoggedIn) {
            this.handleGoogleLogin();
            this.hasLoggedIn = true;
          }
        }
      }).then((loggedIn) => {
        this.logToLocalStorage('Login attempt:'+ loggedIn ? 'Successful' : 'Failed');
      }).catch(error => {
        this.logToLocalStorage('Error during login:'+ error);
      });
    }).catch(error => {
      this.logToLocalStorage('Error loading discovery document:'+ error);
    });
  }

  private logToLocalStorage(message: string) {
    const logs = localStorage.getItem('oauthLogs') || '';
    localStorage.setItem('oauthLogs', logs + message + '\n');
  }

  handleRedirectCallback() {
    this.oauthService.tryLogin({
      onTokenReceived: (context: any) => {
        const accessToken = this.oauthService.getAccessToken();
        const idToken = this.oauthService.getIdToken();
        this.logToLocalStorage('access token: ' + accessToken);
        this.logToLocalStorage('id token: ' + idToken);
        this.setOAuth(accessToken, idToken);

        if (!this.hasLoggedIn) {
          this.handleGoogleLogin();
          this.hasLoggedIn = true;
        }

        // Check if the token is expired and refresh if necessary
        if (this.oauthService.getAccessTokenExpiration() < Date.now() / 1000) {
          this.oauthService.refreshToken().then(() => {
            // Update the cookies after refreshing
            const newAccessToken = this.oauthService.getAccessToken();
            const newIdToken = this.oauthService.getIdToken();
            this.setOAuth(newAccessToken, newIdToken);
          }).catch(error => {
            console.error('Error refreshing token:', error);
            // Handle refresh error (e.g., redirect to login)
          });
        }
      }
    }).then((data) => {
      console.log(data)
    }).catch(error => {
      console.error('Error during login:', error);
    });
  }

  loginWithGoogle() {
    this.logToLocalStorage('Initiating login with Google...');
    this.oauthService.initLoginFlow();
    this.logToLocalStorage('Redirecting to Google for login...');
  }

  handleGoogleLogin() {
    from(this.oauthService.loadDiscoveryDocumentAndTryLogin()).pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(response => {
      this.logToLocalStorage(response+'');
    });
    this.oauthService.loadUserProfile().then((profile: any) => {
      this.logToLocalStorage('User profile: ' + JSON.stringify(profile));
      const user = {
        email: profile['email'],
        firstName: profile['given_name'],
        lastName: profile['family_name']
      };

      // Check if Google user exists in database
      this.credentialService.fetchCredentialByEmail(user.email).subscribe((response: any) => {
        if (response) {
          this.processLogin(response);
        } else {
          this.registerGoogleUser(user);
        }
      }, error => {
        this.alertService.errorMessage('Error occurred while checking user existence', 'Error');
      });
    });
  }

  registerGoogleUser(profile: any) {
    const newUser = {
      email: profile.email,
      firstname: profile.firstname,
      lastname: profile.lastname,
      role: 'candidate',  // default role
      userLevel: '1'      // default user level
    };

    this.credentialService.addCredential(newUser).subscribe((response: any) => {
      // User registered, proceed with login
      this.processLogin(response);
    }, error => {
      this.alertService.errorMessage('Error occurred while registering user', 'Error');
    });
  }

  processLogin(user: any) {
    if (user.role === 'candidate') {
      this.cookieService.createUserID(user.employeeId);
      this.cookieService.createLevel(user.userLevel);
      this.cookieService.unlock();
      this.router.navigate(['/']);
      this.alertService.successMessage('Login successful', 'Success');
    } else if (user.role === 'employer') {
      if (user.userLevel === "2") {
        this.cookieService.createUserID(user.employeeId);
        this.cookieService.createAdmin(user.email);
        this.cookieService.createOrganizationID(user.companyId);
        this.cookieService.createLevel(user.userLevel);
        this.cookieService.unlock();
        this.router.navigate(['/dashboard']);
      } else if (user.userLevel === "3") {
        this.cookieService.createUserID(user.employeeId);
        this.cookieService.createProAdmin(user.email);
        this.cookieService.createOrganizationID(user.companyId);
        this.cookieService.createLevel(user.userLevel);
        this.cookieService.unlock();
        this.router.navigate(['/pro']);
      }
    }
  }
}
