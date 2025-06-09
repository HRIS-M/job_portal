import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CredentialService {

  baseUrl = environment.apiUrl;
  baseUrlSimple = environment.apiUrlSimple;

  constructor(private http: HttpClient) { }

  fetchUserCountByLevel(level: any): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/portal_credentials/getUserCountByLevel/${level}`);
  }

  fetchCredentials(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa('admin:password')
    });
    return this.http.get<any>(`${this.baseUrl}/portal_credentials/getAll`, {headers});
  }

  fetchCredentialById(id: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa('admin:password')
    });
    return this.http.get<any>(`${this.baseUrl}/portal_credentials/get/${id}`, {headers});
  }

  fetchCredentialByEmployeeId(employeeId: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa('admin:password')
    });
    return this.http.get<any>(`${this.baseUrl}/portal_credentials/getByEmployeeId/${employeeId}`, {headers});
  }

  fetchCredentialByEmail(email: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa('admin:password')
    });
    return this.http.get<any>(`${this.baseUrl}/portal_credentials/getByEmail/${email}`, {headers});
  }

  addCredential(credential: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa('admin:password')
    });
    return this.http.post<any>(`${this.baseUrl}/portal_credentials/add/${credential.platform}`, credential, {headers});
  }

  updateCredential(id: any, credential: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa('admin:password')
    });
    return this.http.put<any>(`${this.baseUrl}/portal_credentials/update/${id}`, credential, {headers});
  }

  deleteCredential(id: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa('admin:password')
    });
    return this.http.delete<any>(`${this.baseUrl}/portal_credentials/delete/${id}`, {headers});
  }

  resetPasswordRequest(email: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa('admin:password')
    });
    return this.http.post<any>(`${this.baseUrl}/password-reset/request`, { email: email }, {headers});
  }

  resetPassword(token: any, password: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa('admin:password')
    });
    return this.http.put<any>(`${this.baseUrl}/password-reset/reset`, { token: token, newPassword: password }, {headers});
  }

  login(email: any, password: any): Observable<any> {
    return this.http.post(`${this.baseUrlSimple}/api/auth/login`, { email, password });
  }

  register(credential: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrlSimple}/api/auth/login/${credential.platform}`, credential);
  }
}
