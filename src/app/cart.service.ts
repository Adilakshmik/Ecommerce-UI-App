import { Injectable } from '@angular/core';
import { CartItem } from './cart-item';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  public totalPrice:Subject<number>=new BehaviorSubject<number>(0);
  public totalQuantity:Subject<number>=new BehaviorSubject<number>(0);

  cartItems:CartItem[]=[];

  constructor(){}

  addToCart(theCartItem:CartItem){
    let alreadyExistsInCart:boolean=false;
    let existedCartItem:CartItem=new CartItem(0,"","",0);

    
      
    if(this.cartItems.length >0){
      for(let tempCartItem of this.cartItems){
        if(  tempCartItem.id === theCartItem.id){
          existedCartItem=tempCartItem;
          alreadyExistsInCart=true;
          break;
 
        }
      }
    }  
      
    if(alreadyExistsInCart){
      existedCartItem.quantity++;
    }else{
        this.cartItems.push(theCartItem);
    }
    
  
    this.computeTotal();
  }

  computeTotal(){
    let totalPriceValue:number=0;
    let totalQuantityValue:number=0;
     
    for(let currentItem of this.cartItems){
      totalPriceValue += currentItem.quantity * currentItem.price;
      totalQuantityValue += currentItem.quantity;
    }
    
    //publish new values so that all subscriber can receive  updated cart status data
  
    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue)
  }

  decrementQuantity(theCartItem:CartItem){
    theCartItem.quantity--;
    if(theCartItem.quantity===0){
      this.remove(theCartItem);
    }else{
      this.computeTotal();
    }

  }

  remove(theCartItem:CartItem){
   const itemIndex= this.cartItems.findIndex(tempCartItem=>tempCartItem.id===theCartItem.id);
   if(itemIndex > -1){
    this.cartItems.splice(itemIndex,1);
    this.computeTotal();
   }

  }
  
}
