import { SearchCriteria } from './../models/seach-criteria';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private http = inject(HttpClient);

  listUsers(searchCriteria: SearchCriteria = {}, page: number=0, size: number = 1000): Observable<User[]> {
    return this.http.post<User[]>(`${environment.expressCashApiUrl}/users?page=${page}&size=${size}`, searchCriteria);
  }
}
