import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product, ProductUpdate } from '../../model/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  readonly API = 'http://localhost:4000';
  constructor(private http: HttpClient) {}

  getListProduct() {
    return this.http.get<Product[]>(`${this.API}/product`);
  }

  saveProduct(product: Product) {
    return this.http.post<Product>(`${this.API}/product`, product);
  }

  updateProduct(idProdcut: string, product: Product) {
    return this.http.put<Product>(`${this.API}/product/${idProdcut}`, product);
  }
}
