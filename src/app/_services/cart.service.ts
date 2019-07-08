import {EventEmitter, Injectable, Output} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Order} from '../_models/order';
import {Product} from '../_models/product';


@Injectable()
export class CartService {
  baseUrl = '';
  productToUpdate = null;

  constructor(private http: HttpClient) {
    this.baseUrl = environment.APIEndpoint;
  }

  @Output() change: EventEmitter<Order> = new EventEmitter();

  @Output() reload: EventEmitter<any> = new EventEmitter();

  getAll() {
    return JSON.parse(localStorage.getItem('cart'));
  }
  addItem(product: Product){
    let products = JSON.parse(localStorage.getItem('cart'));
    if(products == null){
      products = [];
    }
    products.push(product);
    localStorage.setItem('cart', JSON.stringify(products));
    this.change.emit();
  }

  newOrder(){
    this.change.emit();
  }

  emptyCart(){
    localStorage.setItem('cart', null);
  }

}
