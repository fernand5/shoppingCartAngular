import {EventEmitter, Injectable, Output} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Product} from '../_models/product';
import {environment} from '../../environments/environment';


@Injectable()
export class ProductService {
  baseUrl = '';
  productToUpdate = null;

  constructor(private http: HttpClient) {
    this.baseUrl = environment.APIEndpoint;
  }

  @Output() change: EventEmitter<Product> = new EventEmitter();

  @Output() reload: EventEmitter<any> = new EventEmitter();

  getAll() {
    return this.http.get<Product>(this.baseUrl);
  }

  get(id: number) {
    return this.http.get<Product>(this.baseUrl + '/' + id);
  }

}
