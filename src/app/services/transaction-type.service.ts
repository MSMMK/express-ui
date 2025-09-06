import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Lookup } from '../models/lookup.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TransactionTypeService {

  private http = inject(HttpClient);


  list(): Observable<Lookup[]> {
    return this.http.get<Lookup[]>(`${environment.expressCashApiUrl}/lookups/transaction-types`);
  }
}
