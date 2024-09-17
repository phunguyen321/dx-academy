import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../../model/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  readonly API = 'http://localhost:4000';
  constructor(private http: HttpClient) { }

  getListProduct(){
    return this.http.get<Product[]>(`${this.API}/product`)
  }
}
