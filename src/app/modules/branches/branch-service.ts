import { User } from './../../models/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Branch } from '../../models/branch';
import { header } from '@primeng/themes/aura/accordion';
import { LocalStorage } from '../../services/local-storage';
import { LoginResponse } from '../../models/login-response';
import { SearchCriteria } from '../../models/seach-criteria';

@Injectable({
  providedIn: 'root',
})
export class BranchService {
  branches$!: Observable<Branch[]>;

  private http = inject(HttpClient);
  private storage = inject(LocalStorage);

  getBranches(searchCritieria: SearchCriteria, page: number, size: number): Observable<Branch[]> {
  return this.http.post<Branch[]>(
      `${environment.expressCashApiUrl}/branches/search?page=${page}&size=${size}`, searchCritieria);
  }

  addBranch(branch: Branch): Observable<any> {
      return this.http.post(`${environment.expressCashApiUrl}/branches`, branch);
  }

  deleteBranch(code: string): Observable<any> {
   return this.http.delete(`${environment.expressCashApiUrl}/branches/${code}`)
  }
}
