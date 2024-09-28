import {OAuthLogger} from "angular-oauth2-oidc";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class MyOAuthLogger extends OAuthLogger {
  debug(message?: any, ...optionalParams: any[]): void {
    console.log('OAuth Debug:', message, ...optionalParams);
  }

  error(message?: any, ...optionalParams: any[]): void {
    console.error('OAuth Error:', message, ...optionalParams);
  }

  info(message?: any, ...optionalParams: any[]): void {
    console.log('OAuth Info:', message, ...optionalParams);
  }

  log(message?: any, ...optionalParams: any[]): void {
    console.log('OAuth Log:', message, ...optionalParams);
  }

  warn(message?: any, ...optionalParams: any[]): void {
    console.warn('OAuth Warn:', message, ...optionalParams);
  }
}
