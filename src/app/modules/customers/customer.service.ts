import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../../models/customer';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private http = inject(HttpClient);

  listCustomers(id: number, type: string): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${environment.expressCashApiUrl}/branches/${id}/customers?type=${type}`);
  }

  addCustomer(customer: Customer): Observable<any> {
    return this.http.post(`${environment.expressCashApiUrl}/customers`, customer);
  }

  deleteCustomer(id: number): Observable<any> {
    return this.http.delete(`${environment.expressCashApiUrl}/customers/${id}`);
  }

}
