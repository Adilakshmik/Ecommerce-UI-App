import { Component, OnInit } from '@angular/core';
import { OrderHistoryService } from '../order-history.service';
import { OrderHistory } from '../common/order-history';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-history.component.html',
  styleUrl: './order-history.component.css'
})
export class OrderHistoryComponent implements OnInit{

  orderHistoryList:OrderHistory[]=[];
  session:Storage=sessionStorage;

  constructor(private orderService:OrderHistoryService){

  }
  ngOnInit(): void {
    
   this.loadCustomerOrders();
  }

  loadCustomerOrders() {
    const theEmailId = this.session.getItem('customerEmail');
    this.orderService.getCustomersOrders(theEmailId!).subscribe(data => {
      if (data.content && data.content.length > 0) {
        this.orderHistoryList = data.content; // Access orders from 'content'
        console.log(this.orderHistoryList);
      } else {
        console.error("No orders found in the response.", data);
        this.orderHistoryList = []; // Reset to empty if no orders
      }
    }, error => {
      console.error('Error fetching customer orders', error);
    });
  }
  
}
