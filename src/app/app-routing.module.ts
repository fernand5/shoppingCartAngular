import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CatalogComponent} from './pages/catalog/catalog.component';
import {OrdersComponent} from './pages/orders/orders.component';

const routes: Routes = [
  {path: 'orders', component: OrdersComponent},
  {path: 'catalog', component: CatalogComponent},
  {path: '**', redirectTo: 'catalog'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
