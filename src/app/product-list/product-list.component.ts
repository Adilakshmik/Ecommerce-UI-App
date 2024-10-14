import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../product';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { CartItem } from '../cart-item';
import { CartService } from '../cart.service';
import { CartStatusComponent } from '../cart-status/cart-status.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule,RouterModule,CartStatusComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit{

  products:Product[]=[];
  currentCategoryId:number=1;
  productId:number=1;
  product:Product | undefined;
  searchMode:boolean | undefined;
  

  constructor(private productService:ProductService,
              private cartService:CartService,
              private route: ActivatedRoute
  ){

  }
  ngOnInit(): void {
    
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
    
    
  }

  listProducts(){
    this.searchMode = this.route.snapshot.paramMap.has('keyword');
    if(this.searchMode){
      this.searchProductsWithKeyword();
    }else{
      this.loadProductsByCategory();
    }
  }

  
        
  loadProductsByCategory() {
    // check id param available in routed url
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('categoryId');
    if (hasCategoryId) {
      this.currentCategoryId = + this.route.snapshot.paramMap.get('categoryId')!;
      console.log(this.currentCategoryId);
    } else {
      this.currentCategoryId = 1;
    }
    this.productService.getProductsByCategory(this.currentCategoryId).subscribe((data) => {
      console.log(data);
      this.products = data;
    });
  }

  searchProductsWithKeyword(){
    const keyword: string = this.route.snapshot.paramMap.get('keyword')!;
    this.productService.searchProducts(keyword).subscribe((data)=>{
      this.products = data;
    console.log(this.products);
  });
    
  }

  

  getProducts(){
    this.productService.getProducts().subscribe((data)=>{
      console.log(data);
      this.products=data;
      console.log(this.products);
    })
  }

  handleAddToCart(theProduct:Product){
    const cartItem:CartItem=new CartItem(theProduct.id!,theProduct.name!,theProduct.imageUrl!,theProduct.price!)
    this.cartService.addToCart(cartItem);

  }

  }

 


