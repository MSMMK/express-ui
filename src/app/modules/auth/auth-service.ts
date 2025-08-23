import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginRequest } from '../../models/login-request';
import { LoginResponse } from '../../models/login-response';
import { RegisterRequest } from '../../models/register-request';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { LocalStorage } from '../../services/local-storage';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);
  private storage= inject(LocalStorage);
  private router = inject(Router);
  private readonly STORAGE_KEY = 'user';
  private readonly TOKEN = 'token';

  user: LoginResponse | null = null;


  setUser(user: LoginResponse) {
    this.storage.setItem(this.STORAGE_KEY, user);
    localStorage.setItem(this.TOKEN, user.token);
  }

  private loadUser(): any {
    return this.storage.getItem(this.STORAGE_KEY);;
  }

  get AuthUser(): LoginResponse {
     return this.loadUser();
  }

  login(loginRequest: LoginRequest): Observable<LoginResponse> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<LoginResponse>(`${environment.expressCashApiUrl}/auth/login`, loginRequest, { headers });
  }

  register(RegisterRequest: RegisterRequest): Observable<unknown> {
    return this.http.post(`${environment.expressCashApiUrl}/auth/register`, RegisterRequest);
  }

  logout(): void {
    this.storage.removeItem(this.STORAGE_KEY);
    this.router.navigate(['register']);
  }

  isAuthenticated(): boolean {
    return !!this.user;
  }

}
