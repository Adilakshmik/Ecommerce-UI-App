import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Purchase } from './common/purchase';
import { Response } from './common/response';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  orderTrackingNumber: any;
  razorpayPaymentId: any;

  constructor(
    private httpClient:HttpClient
  ) { }

  purchaseUrl:string='http://localhost:8081/api/orders/purchase';

  placeOrder(purchase:Purchase):Observable<any>{
    
   return  this.httpClient.post<Response>(this.purchaseUrl,purchase);
          
  }


}
