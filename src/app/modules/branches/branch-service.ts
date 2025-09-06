import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Branch } from '../../models/branch';
import { LocalStorage } from '../../services/local-storage';
import { SearchCriteria } from '../../models/seach-criteria';

@Injectable({
  providedIn: 'root',
})
export class BranchService {
  branches$!: Observable<Branch[]>;

  private http = inject(HttpClient);
  private storage = inject(LocalStorage);

  getBranches(searchCritieria: SearchCriteria = {}, page: number = 0, size: number = 1000): Observable<Branch[]> {
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
