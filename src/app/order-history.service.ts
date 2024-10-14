import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { OrderHistory } from './common/order-history';

@Injectable({
  providedIn: 'root'
})
export class OrderHistoryService {

  private orderUrl='http://localhost:8081/api/orders';

  constructor(private httpClient:HttpClient) { }

 

  getCustomersOrders(theEmail: string): Observable<GetOrderHistory> {
    const apiUrl = `${this.orderUrl}/search/findByCustomerEmail?email=${theEmail}&page=0&size=20`;
    return this.httpClient.get<GetOrderHistory>(apiUrl)
}

}  

interface GetOrderHistory {
  content: OrderHistory[]; // Correct structure based on response
}
