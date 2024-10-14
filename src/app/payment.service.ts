import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

   private RAZORPAY_KEY="rzp_test_oXc1iudPXI8hB9";

  constructor(private httpClient:HttpClient) { }

  processPayment(orderId:string,amount:number,successcallback:(response:any)=>void):void{
    const options:any={

      key: this.RAZORPAY_KEY,
      amount: amount * 100,
      currency:'INR',
      name:'Adilakshmi',
      orderId: orderId,
      description:'e-commerce order',
      handler: successcallback,
      prefill:{
        name:'Adilakshmi',
        email:'',
        contact:''
      },
      notes:{
        Address:'customer Address'
      },
      theme:{
        "color":"#3399cc"
      }


    };

    const rzp1=new Razorpay(options);
    rzp1.open();

  };

  updateOrderStatus(razorpayPaymentId: string,razorpayOrderId:string) {
    const apiUrl = 'http://localhost:8081/api/orders/payment-success';
    
    // Sending the razorpayPaymentId in the request body
    this.httpClient.post(apiUrl, { razorpayPaymentId,razorpayOrderId })
      .subscribe({
        next: (response) => console.log("Order status updated to CONFIRMED", response),
        error: (err) => console.error("Error updating order status", err)
      });
  }
  
  
  
}
