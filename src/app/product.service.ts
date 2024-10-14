import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from './product';
import { map, Observable } from 'rxjs';
import { ProductCategory } from './product-category';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl:string="http://localhost:8081/products";

  categoryUrl:string="http://localhost:8081/product-category"



  constructor(private httpClient:HttpClient) { }

  

  getProducts():Observable<Product[]>{
    return this.httpClient
               .get<getResponse>(this.baseUrl)
               .pipe(map((response=>response._embedded.products)));
              
  }

  getProductsByCategory(theCategoryId: number): Observable<Product[]>{
    const searchUrl = `${this.categoryUrl}/${theCategoryId}/products`;
    return this.httpClient
               .get<getResponse>(searchUrl)
               .pipe(map(response => response._embedded.products));
  
  }

  getProduct(theProductId: number): Observable<Product>{
    const productUrl = `${this.baseUrl}/${theProductId}`;
    return this.httpClient.get<Product>(productUrl);
  }

  

  getProductsCategory():Observable<ProductCategory[]>{
    return this.httpClient
               .get<getResponseProductcategories> (this.categoryUrl)
               .pipe(map(response=>response._embedded.productCategory));

  }

  searchProducts(theKeyword:string){
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`;
     return this.httpClient
               .get<getResponse>(searchUrl)
               .pipe(map((response=>response._embedded.products)));
  }
 
              


 }

interface getResponse{
  _embedded:{
    products:Product[];
  }
}

interface getResponseProductcategories{

  _embedded:{
    productCategory:ProductCategory[];
  }

}