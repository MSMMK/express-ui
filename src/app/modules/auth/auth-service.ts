import { UserType } from './../../models/user-type.enum';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { LoginRequest } from '../../models/login-request';
import { LoginResponse } from '../../models/login-response';
import { RegisterRequest } from '../../models/register-request';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { LocalStorage } from '../../services/local-storage';
import { User } from '../../models/user';
import { Branch } from '../../models/branch';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);
  private storage= inject(LocalStorage);
  private router = inject(Router);
  private readonly STORAGE_KEY = 'user';

  setUser(user: LoginResponse) {
    this.storage.setItem(this.STORAGE_KEY, user);
  }

  public get user (): LoginResponse {
    return this.storage.getItem(this.STORAGE_KEY);
  }

  private getToken(): any {
    return this.storage.getItem(this.STORAGE_KEY).token;
  }

  public get token(): LoginResponse {
     return this.getToken();
  }

  public get userDetails(): User {
    return this.storage.getItem(this.STORAGE_KEY)?.details;
  }

  public get userType(): UserType {
    return this.storage.getItem(this.STORAGE_KEY)?.details.userType!;
  }

  public get userBranch(): Branch {
    return this.storage.getItem(this.STORAGE_KEY)?.details?.branch;
  }

  login(loginRequest: LoginRequest): Observable<LoginResponse> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<LoginResponse>(`${environment.expressCashApiUrl}/auth/login`, loginRequest, { headers });
  }

  register(RegisterRequest: RegisterRequest): Observable<any> {
    return this.http.post(`${environment.expressCashApiUrl}/auth/register`, RegisterRequest);
  }

  logout(): void {
    this.storage.removeItem(this.STORAGE_KEY);
    this.router.navigate(['register']);
  }

  isTokenExpired(): Observable<boolean> {
    return this.http.get<boolean>(`${environment.expressCashApiUrl}/auth/token-expired?token=${this.getToken()}`);
  }

  refreshAccessToken(): Observable<string> {
    return this.http.get<any>(`/auth/refresh?refresh_token${this.getToken()}`).pipe(
      switchMap((response) => {
        console.log(response);
        const newAccessToken = response.access_token;
        const user = this.user;
        user.token = newAccessToken;
        this.setUser(user)// Store the new access token
        return [newAccessToken];
      }));
  }

}
