import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../../model/category';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  readonly API = 'http://localhost:4000';

  constructor(private http: HttpClient) {}

  getListCategory() {
    return this.http.get<Category[]>(`${this.API}/category`);
  }
}
