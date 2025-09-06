import { SearchCriteria } from './../../models/seach-criteria';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { TransactionHistoryModel } from '../../models/transaction-history';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private http = inject(HttpClient);

  createTransaction(transaction: any) {
    return this.http.post(`${environment.expressCashApiUrl}/transactions`, transaction);
  }

  listTransactions(searchCriteria: SearchCriteria): Observable<TransactionHistoryModel[]> {
    return this.http.post<TransactionHistoryModel[]>(`${environment.expressCashApiUrl}/transactions/search`, searchCriteria);
  }

  deleteTransaction(id: number) {
    return this.http.delete(`${environment.expressCashApiUrl}/transactions/${id}`);
  }

  export(searchCriteria: SearchCriteria): Observable<Blob> {
    return this.http.post(`${environment.expressCashApiUrl}/transactions/export`, searchCriteria, {responseType: 'blob'});
  }

}
