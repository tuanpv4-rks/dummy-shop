import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IProductResponse, ISimpleProduct } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private http = inject(HttpClient);

  public getProducts(): Observable<ISimpleProduct[]> {
    const params = new HttpParams().set('limit', 0);
    return this.http
      .get<IProductResponse>('/auth/products', { params })
      .pipe(map(({ products }) => products));
  }
}
