import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {ProductService} from './_services/product.service';
import { CatalogComponent } from './pages/catalog/catalog.component';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatAutocompleteModule,
  MatBadgeModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatFormFieldControl,
  MatFormFieldModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule, MatStepperModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule
} from '@angular/material';
import {MatTableModule} from '@angular/material/table';
import {NgModule} from '@angular/core';
import { ModalGenericComponent } from './pages/modal-generic/modal-generic.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { SidenavComponent } from './layout/sidenav/sidenav.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { TableGenericComponent } from './pages/table-generic/table-generic.component';
import { ModalCreateComponent } from './pages/modal-create/modal-create.component';
import { FormOrderComponent } from './pages/form-order/form-order.component';
import {ToastrModule} from 'ngx-toastr';
import {OrderService} from './_services/order.service';
import {CartService} from './_services/cart.service';
import {SimpleNotificationsModule} from 'angular2-notifications';


@NgModule({
  declarations: [
    AppComponent,
    CatalogComponent,
    ModalGenericComponent,
    SidenavComponent,
    OrdersComponent,
    TableGenericComponent,
    ModalCreateComponent,
    FormOrderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    FormsModule,
    MatFormFieldModule,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    MatIconModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    ToastrModule.forRoot(),
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatStepperModule,
    SimpleNotificationsModule.forRoot(),
    MatBadgeModule
  ],
  exports:[
    MatDatepickerModule,
    MatNativeDateModule,

  ],
  providers: [
    ProductService,
    OrderService,
    CartService
  ],
  entryComponents: [
    ModalGenericComponent,
    ModalCreateComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
