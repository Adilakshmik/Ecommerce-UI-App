import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { HttpClient, HttpClientModule, provideHttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ProductCategoryMenuComponent } from './product-category-menu/product-category-menu.component';
import { SearchComponent } from './search/search.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CartStatusComponent } from './cart-status/cart-status.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,ProductListComponent,HttpClientModule,RouterModule,CommonModule,ProductCategoryMenuComponent,SearchComponent,ProductDetailsComponent,CartStatusComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'EcommerceApp';

  
}
