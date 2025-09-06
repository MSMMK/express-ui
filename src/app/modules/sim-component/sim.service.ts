import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { SimModel } from '../../models/sim-model';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { SearchCriteria } from '../../models/seach-criteria';

@Injectable({
  providedIn: 'root'
})
export class SimService {

  private http = inject(HttpClient);

  list(): Observable<SimModel[]> {
    return this.http.get<SimModel[]>(`${environment.expressCashApiUrl}/sims`);
  }

  add(sim: SimModel): Observable<any> {
    return this.http.post(`${environment.expressCashApiUrl}/sims`, sim);
  }

  search(searchCriteria: SearchCriteria = {}, page: number = 0, size: number = 1000): Observable<SimModel[]> {
    return this.http.post<SimModel[]>(`${environment.expressCashApiUrl}/sims/search?page=${page}&size=${size}`, searchCriteria);
  }
}
