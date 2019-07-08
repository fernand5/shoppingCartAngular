import {EventEmitter, Injectable, Output} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Product} from '../_models/product';
import {environment} from '../../environments/environment';


@Injectable()
export class ProductService {
  baseUrl = '';

  constructor(private http: HttpClient) {
    this.baseUrl = environment.APIEndpoint; // API URL
  }

  @Output() change: EventEmitter<Product> = new EventEmitter(); // Emitter when some value changed

  /**
   * Get all products
   */
  getAll() {
    return this.http.get<Product>(this.baseUrl);
  }

  /**
   * Get product by id
   * @param id Identification
   */
  get(id: number) {
    return this.http.get<Product>(this.baseUrl + '/' + id);
  }

}
