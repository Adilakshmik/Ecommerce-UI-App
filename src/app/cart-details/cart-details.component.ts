import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { CartItem } from '../cart-item';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart-details',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './cart-details.component.html',
  styleUrl: './cart-details.component.css'
})
export class CartDetailsComponent implements OnInit{

  totalPrice:number=0;
  totalQuantity:number=0;
  orderItems:CartItem[]=[];

  constructor(
    private cartService:CartService
  ){}

  ngOnInit(): void {
   
    this.listOrderdetails();
  }

  listOrderdetails(){
    const orderItems=this.cartService.cartItems;
    console.log(orderItems);
    this.orderItems=orderItems;

    this.cartService.totalPrice.subscribe((data)=>
      this.totalPrice=data
    );
    this.cartService.totalQuantity.subscribe((data)=>
      this.totalQuantity=data
    )

    this.cartService.computeTotal();
  }

  incrementQuantity(theCartItem:CartItem){
    this.cartService.addToCart(theCartItem);

  }

  decrementQuantity(theCartItem:CartItem){
    this.cartService.decrementQuantity(theCartItem);

  }

  remove(theCartItem:CartItem){
    this.cartService.remove(theCartItem);
  }

}
