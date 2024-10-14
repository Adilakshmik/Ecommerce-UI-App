import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CartService } from '../cart.service';
import { CheckoutService } from '../checkout.service';
import { Order } from '../common/order';
import { OrderItem } from '../common/order-item';
import { Purchase } from '../common/purchase';
import {
  ActivatedRoute,
  Router,
  RouterModule,
  RouterOutlet,
} from '@angular/router';
import { Response } from '../common/response';
import { PaymentService } from '../payment.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent implements OnInit {
  razorpayOrderId: string = '';
  orderTrackingNumber: any;
  razorpayPaymentId: any;

  constructor(
    private formBuilder: FormBuilder,
    private cartService: CartService,
    private checkoutService: CheckoutService,
    private paymentService: PaymentService,
    private router: Router
  ) {}

  checkoutFormGroup!: FormGroup;

  totalPrice: number = 0;
  totalQuantity: number = 0;

  ngOnInit(): void {
    this.reviewCartDetails();

    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        name: [''],
        email: [''],
        phno: [''],
      }),
      shippingAddress: this.formBuilder.group({
        hno: [''],
        street: [''],
        city: [''],
        state: [''],
        country: [''],
        zipCode: [''],
      }),
    });
  }

  getName() {
    return this.checkoutFormGroup.get('customer.name');
  }
  getEmail() {
    return this.checkoutFormGroup.get('customer.email');
  }
  getPhno() {
    return this.checkoutFormGroup.get('customer.phno');
  }

  getHno() {
    return this.checkoutFormGroup.get('shippingAddress.hno');
  }
  getStreet() {
    return this.checkoutFormGroup.get('shippingAddress.street');
  }
  getCity() {
    return this.checkoutFormGroup.get('shippingAddress.city');
  }
  getState() {
    return this.checkoutFormGroup.get('shippingAddress.state');
  }
  getCountry() {
    return this.checkoutFormGroup.get('shippingAddress.country');
  }
  getZipCode() {
    return this.checkoutFormGroup.get('shippingAddress.zipCode');
  }

  onSubmit() {
    console.log('Form Submitted..');
    console.log('email::' + this.checkoutFormGroup.get('customer')?.value.email);
    console.log(this.totalPrice);

    // Prepare order
    let order = new Order(this.totalPrice, this.totalQuantity);

    // Get cart items
    const cartItems = this.cartService.cartItems;
    let orderItems: OrderItem[] = cartItems.map(
      (tempCartItem) => new OrderItem(tempCartItem.imageUrl!, tempCartItem.price!, tempCartItem.quantity!, tempCartItem.id!)
    );

    // Prepare purchase object
    let purchase = new Purchase();
    purchase.customer = this.checkoutFormGroup.controls['customer'].value;
    purchase.shippingAddress = this.checkoutFormGroup.controls['shippingAddress'].value;
    purchase.order = order;
    purchase.orderItems = orderItems;

    console.log('Purchase object:', purchase);

    // Call the checkout service to place the order
    this.checkoutService.placeOrder(purchase).subscribe({
        next: (data) => {
            // Log the entire response object
            console.log('Response data:', data);
            
            // Access the orderTrackingNumber and razorpayPaymentId from the data object
            this.orderTrackingNumber = data.orderTrackingNumber;
            this.razorpayOrderId = data.razorpayOrderId;
            
            // Log the values for debugging
            console.log('Order Tracking Number:', this.orderTrackingNumber);
            console.log('Razorpay Order ID:', this.razorpayOrderId);

            // Process the payment
            this.paymentService.processPayment(
              data.razorpayOrderId,
              this.totalPrice,
              this.onPaymentSuccess.bind(this)
            );
        },
        error: (err) => {
            console.error('Error placing order:', err);
        }
    });
}

  onPaymentSuccess(response: any) {
    console.log('payment success:', response);
    this.resetCart();
    this.razorpayPaymentId = response.razorpay_payment_id;

    // Call the backend to update the order status and pass the razorpayPaymentId
    this.paymentService.updateOrderStatus(this.razorpayPaymentId,this.razorpayOrderId);
    console.log('razorpayPaymentId ::' + this.razorpayPaymentId);
    this.router.navigateByUrl("/payment-success");
}

  

  reviewCartDetails() {
    this.cartService.totalPrice.subscribe((data) => {
      this.totalPrice = data;
    });

    this.cartService.totalQuantity.subscribe((data) => {
      this.totalQuantity = data;
    });
  }

  resetCart() {
    this.cartService.cartItems = [];
    this.cartService.totalPrice.next(0);
    this.cartService.totalQuantity.next(0);
    this.checkoutFormGroup.reset;
  }
}
