import { Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductCategoryMenuComponent } from './product-category-menu/product-category-menu.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CartDetailsComponent } from './cart-details/cart-details.component';
import { ProductCategory } from './product-category';
import { CheckoutComponent } from './checkout/checkout.component';
import { PaymentSuccessComponent } from './payment-success/payment-success.component';
import { LoginComponent } from './login/login.component';
import { OrderHistoryComponent } from './order-history/order-history.component';

export const routes: Routes = [


{path:'products',component:ProductListComponent},
{path:'orders',component:OrderHistoryComponent},
{path:'login',component:LoginComponent},
{path:'payment-success',component:PaymentSuccessComponent},
{path:'checkout',component:CheckoutComponent},
{path:'cart-details',component:CartDetailsComponent},
{path:'products/:id',component:ProductDetailsComponent},
{path:'search/:keyword',component:ProductListComponent},
{path:'category',component:ProductListComponent},
{path:'category/:categoryId',component:ProductListComponent},
{path:'',redirectTo:'/products',pathMatch:'full'},
{path:'**',redirectTo:'/products',pathMatch:'full'}
];
