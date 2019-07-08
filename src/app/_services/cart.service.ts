import {EventEmitter, Injectable, Output} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Order} from '../_models/order';
import {Product} from '../_models/product';


@Injectable()
export class CartService {
  baseUrl = '';
  constructor(private http: HttpClient) {
    this.baseUrl = environment.APIEndpoint; // API URL
  }

  @Output() change: EventEmitter<Order> = new EventEmitter(); // Emitter when some value changed

  /**
   * Get all shopping cart
   * @param product Item to add
   */
  getAll() {
    if(localStorage.getItem('cart') === null){
      return [];
    }
    return JSON.parse(localStorage.getItem('cart'));
  }

  /**
   * Add product to shopping cart
   * @param product Item to add
   */
  addItem(product: Product){
    let products = JSON.parse(localStorage.getItem('cart'));
    if(products == null){
      products = [];
    }
    products.push(product);
    localStorage.setItem('cart', JSON.stringify(products));
    this.change.emit();
  }

  /**
   * Remove cart from localstorage
   */
  emptyCart(){
    localStorage.removeItem('cart');
  }

}
