import {EventEmitter, Injectable, Output} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Order} from '../_models/order';


@Injectable()
export class OrderService {
  baseUrl = '';

  constructor(private http: HttpClient) {
    this.baseUrl = environment.APIEndpoint; // API URL
  }

  @Output() change: EventEmitter<Order> = new EventEmitter(); // Emitter when some value changed

  /**
   * Get all orders from localstorage
   */
  getAll() {
    return JSON.parse(localStorage.getItem('orders'));
  }

  /**
   * Add order to localstorage
   * @param order Item to add
   */
  addOrder(order: Order) {
    let nextId = 0;
    let orders = JSON.parse(localStorage.getItem('orders'));
    if (orders == null) {
      orders = [];
      nextId = 1;
    } else {
      nextId = orders.length + 1;
    }
    order.id = nextId;
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));
  }

  /**
   * New order was put
   */
  newOrder() {
    this.change.emit();
  }

}
