import {OAuthStorage} from "angular-oauth2-oidc";
import {AuthService} from "../services/auth.service";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class MyOAuthStorage extends OAuthStorage {

  constructor(private cookieService: AuthService) {
    super();
  }

  getItem(key: string): string {
    return this.cookieService.getOAuth(key)
  }
  removeItem(key: string): void {
    this.cookieService.deleteOAuth(key);
  }
  setItem(key: string, data: string): void {
    this.cookieService.setOAuth(key, data,null,null,null,false);
  }

}
