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
    let index = 0;
    let products = JSON.parse(localStorage.getItem('cart'));
    if(products == null || products.length == 0){
      products = [];
      index = 1;
    }else{
      index = products[products.length-1].id + 1 ;
    }
    product['id'] = index;
    products.push(product);
    localStorage.setItem('cart', JSON.stringify(products));
    this.change.emit();
  }

  /**
   * Add product to shopping cart
   * @param product Item to add
   */
  removeItem(index){
    let products = JSON.parse(localStorage.getItem('cart'));

    products = products.filter(product => product.id != index);

    console.log(products);
    // products.push(product);
    localStorage.setItem('cart', JSON.stringify(products));
    this.change.emit();
  }

  /**
   * Remove cart from localstorage
   */
  emptyCart(){
    localStorage.removeItem('cart');
    this.change.emit();

  }

}
