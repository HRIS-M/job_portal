import { Injectable } from '@angular/core';
import {CookieService} from "ngx-cookie-service";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private cookieService: CookieService) { }

  public createUserID(token:any){
    this.cookieService.set('user-token-id',token,60*60*24*7);
  }

  public createOrganizationID(token:any){
    this.cookieService.set('organization',token, 60*60*24*7);
  }

  public createLevel(token:any){
    this.cookieService.set('level', token, 60*60*24*7)
  }

  public createAdmin(token:string){
    this.cookieService.set('admin-token',token,60*60*24*7);
  }

  public createProAdmin(token:string){
    this.cookieService.set('pro-admin-token',token,60*60*24*7);
  }

  clearAuthCookies() {
    const cookies = ['access_token', 'id_token'];
    cookies.forEach(cookie => {
      document.cookie = `${cookie}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;`;
    });
  }

  public logout(){
    this.cookieService.delete('user-token-id');
    this.cookieService.delete('pro-admin-token');
    this.cookieService.delete('organization');
    this.cookieService.delete('admin-token');
    this.cookieService.delete('level');
    this.clearAuthCookies();
  }

  public isExists():boolean{
    let user = this.cookieService.get('user-token-id');
    return user.length !== 0; //user.length === 0?false:true
  }

  public isAdmin():boolean{
    let admin = this.cookieService.get('admin-token');
    return admin.length !== 0;
  }

  public isProAdmin():boolean{
    let proAdmin = this.cookieService.get('pro-admin-token');
    return proAdmin.length !== 0;
  }

  public isOrganization():boolean{
    let org = this.cookieService.get('organization');
    return org.length !== 0;
  }

  public userID() {
    return this.cookieService.get('user-token-id').toString();
  }

  public adminEmail() {
    return this.cookieService.get('admin-token').toString();
  }

  public organization() {
    return this.cookieService.get('organization').toString();
  }

  public level() {
    return this.cookieService.get('level').toString();
  }

  public lock() {
    return this.cookieService.set('locked', 'true');
  }

  public unlock() {
    return this.cookieService.delete('locked');
  }

  public isLocked() {
    let locked = this.cookieService.get('locked');
    return locked.length !== 0;
  }

  public acceptAllCookies() {
    this.cookieService.set('cookies-accepted', 'true', 60*60*24*20);
  }

  public necessaryCookiesOnly() {
    this.cookieService.set('cookies-accepted', 'false', 60*60*24*20);
  }

  public isCookiesAccepted() {
    let cookie = this.cookieService.get('cookies-accepted');
    return cookie.length !== 0;
  }

  public getOAuth(key:string){
    return this.cookieService.get(key);
  }

  public setOAuth(key:string, value:string, expires?:any, path?:any, domain?:any, secure?:boolean){
    this.cookieService.set(key, value, expires, path, domain, secure);
  }

  public deleteOAuth(key:string){
    this.cookieService.delete(key);
  }

}
