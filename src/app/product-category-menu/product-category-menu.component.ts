import { Component, OnInit } from '@angular/core';
import { ProductCategory } from '../product-category';
import { ProductService } from '../product.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-product-category-menu',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './product-category-menu.component.html',
  styleUrl: './product-category-menu.component.css'
})
export class ProductCategoryMenuComponent implements OnInit{

  productCategories:ProductCategory[]=[];

  constructor(
    private service:ProductService
  ){}

  ngOnInit(): void {
    this.listProductcategories();
  }

  listProductcategories(){
    this.service.getProductsCategory().subscribe(data=>
      this.productCategories=data

    )
  }

}
