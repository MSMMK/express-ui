import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Lookup } from '../models/lookup.model';

@Injectable({
  providedIn: 'root'
})
export class LookupsService {
  private http = inject(HttpClient);

  getGvernotaes(): Observable<Lookup[]> {
    return this.http.get<Lookup[]>(`${environment.expressCashApiUrl}/lookups/governorates`);
  }

  getCities(govId: number): Observable<Lookup[]> {
    return this.http.get<Lookup[]>(`${environment.expressCashApiUrl}/lookups/governorates/${govId}/cities`);
  }

   getUserTypes(): Observable<Lookup[]> {
    return this.http.get<Lookup[]>(`${environment.expressCashApiUrl}/lookups/user-types`);
  }
}
