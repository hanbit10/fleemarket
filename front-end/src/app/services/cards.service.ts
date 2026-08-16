import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Product } from '../models/product';
import { BASE_URL } from '../constants/urls';

const cardUrl = BASE_URL;

@Injectable({
  providedIn: 'root',
})
export class CardsService {
  constructor(private _http: HttpClient) {}

  getAll(): Observable<Product[]> {
    return this._http.get<Product[]>(`${BASE_URL}/card/cards`);
  }
  getProduct(_id: string): Observable<object> {
    return this._http.get(`${BASE_URL}/card/card/${_id}`);
  }
  getProductByUser(_userId: string): Observable<Product[]> {
    return this._http.get<Product[]>(`${BASE_URL}/card/user/${_userId}`);
  }
  create(data: any): Observable<Product> {
    return this._http.post<Product>(`${BASE_URL}/card/register`, data);
  }

  createFile(data: FormData): void {
    console.log(data);
    this._http
      .post<any>(`${BASE_URL}/card/register/image`, data)
      .subscribe((res) => {
        console.log(res);
      });
  }

  update(id: any, data: any): Observable<Product> {
    return this._http.put<Product>(`${BASE_URL}/update/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this._http.delete(`${BASE_URL}/card/delete/${id}`);
  }
  searchByTitle(searchText: string): Observable<Product[]> {
    return this.getAll().pipe(
      map((data) => {
        if (!data) return [];
        if (!searchText) return data;
        return data.filter((product) => {
          const query = searchText.toLowerCase();
          return product.title.toLowerCase().includes(query);
          // || product.description.toLowerCase().includes(query)
        });
      })
    );
  }
  findByUser(userId: string): Observable<Product[]> {
    return this.getProductByUser(userId);
  }
}
