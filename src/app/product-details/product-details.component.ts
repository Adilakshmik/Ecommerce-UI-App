import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Product } from '../product';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit{

  product:Product =new Product(
   1,
   "sample product",
  "this is sample product",
  100,
   "http:example.com/sample-product.jpg",
   200,
   new Date('25-09-2024'),
   20,
   1
  );

  constructor(
    private productService:ProductService,
    private route:ActivatedRoute
  ){}

  ngOnInit(): void {
   this.handleProductDetails();
  }



  handleProductDetails(){
   const productId:number= + this.route.snapshot.paramMap.get('id')!;
   this.productService.getProduct(productId).subscribe((data)=>{
  console.log(data);
   this.product=data;
  })
  }

}


