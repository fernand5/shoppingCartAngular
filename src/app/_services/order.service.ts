import {EventEmitter, Injectable, Output} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Order} from '../_models/order';


@Injectable()
export class OrderService {
  baseUrl = '';
  productToUpdate = null;

  constructor(private http: HttpClient) {
    this.baseUrl = environment.APIEndpoint;
  }

  @Output() change: EventEmitter<Order> = new EventEmitter();

  @Output() reload: EventEmitter<any> = new EventEmitter();

  getAll() {
    return JSON.parse(localStorage.getItem('orders'));
  }
  addOrder(order: Order){
    let orders = JSON.parse(localStorage.getItem('orders'));
    if(orders == null){
      orders = [];
    } else {
      let nextId = orders.length + 1;
      order.id = nextId;
    }
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));
  }

  newOrder(){
    this.change.emit();
  }

}
