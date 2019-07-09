import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatDialog, MatTableDataSource} from '@angular/material';
import {ToastrService} from 'ngx-toastr';
import {FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {OrderService} from '../../_services/order.service';
import * as moment from 'moment';
import {CartService} from '../../_services/cart.service';
import {Product} from '../../_models/product';
import {TableGenericComponent} from '../table-generic/table-generic.component';


export interface OwnerForCreation {
  name: string;
  dateOfBirth: Date;
  address: string;
}

export interface City {
  name: string;
  dateOfBirth: Date;
  address: string;
}

@Component({
  selector: 'app-form-order',
  templateUrl: './form-order.component.html',
  styleUrls: ['./form-order.component.scss']
})
export class FormOrderComponent implements OnInit {

  @ViewChild(TableGenericComponent, {static: true}) table: TableGenericComponent;

  // Formgroup that will be displayed
  public ownerForm: FormGroup;

  fileIdentificationSelected: File; // File to storage pdf
  imageIdentificationToUpload: FormData; // Form data to upload
  products: Product[]; // Products array

  // Items and their types for table configuration
  itemsType = [
    {
      index: 'descripcion',
      title: 'Descripcion',
      type: 'text',
    },
    {
      index: 'miniatura',
      title: 'Imagen',
      type: 'image',
    },
    {
      index: 'precio',
      title: 'Precio',
      type: 'currency',
    },
    {
      index: 'buttons',
      title: 'Acciones',
      type: 'buttons',
      buttons: [
        {
          removeRowAction: true,
          icon: 'delete',
        }
      ],
    }

  ];
  
  // Columns to display on table
  displayedColumns: string[] = ['descripcion', 'miniatura', 'precio', 'buttons'];


  // Cities to select
  cities = [
    {value: 'Medellin'},
    {value: 'Envigado'},
    {value: 'Sabaneta'}
  ];
  
  @Input() model: any; // Init model

  @ViewChild('product', { static: true, read: NgForm }) form: any; // Form that will be controlled for parent component

  constructor(private dialogRef: MatDialog,
              private toastr: ToastrService,
              private cartService: CartService,
              private orderService: OrderService) {
    this.imageIdentificationToUpload = new FormData();
  }

  /**
   * Init the formgroup with their validations
   */
  ngOnInit() {
    this.ownerForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      dateOfBirth: new FormControl(new Date()),
      address: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      city: new FormControl('', [Validators.required])

    });
    this.products = this.cartService.getAll();

    this.table.dataSource = new MatTableDataSource(this.products);
    this.cartService.change.subscribe(result => {
      this.products = this.cartService.getAll();
      this.table.dataSource = new MatTableDataSource(this.cartService.getAll());
    });
  }

  /**
   * Validation of formgroup to display errors
   * @param controlName control on formgroup
   * @param errorName text to display
   */
  public hasError = (controlName: string, errorName: string) =>{
    return this.ownerForm.controls[controlName].hasError(errorName);
  }

  /**
   * Proccess to validate file
   * @param event File
   */
  onFileProductChanged(event) {
    const uploadData = new FormData();

    const allowedExtensions = ['PDF', 'pdf']; // Formats allowed
    const fileExtension = event.target.files[0].name.split('.').pop();

    if (allowedExtensions.includes(fileExtension)) {
      if (event.target.files[0].size < 1000000) { // 1MB max

        if (event.target.files && event.target.files[0]) {
          const reader = new FileReader();

          reader.onload = (event: ProgressEvent) => {
            this.model.identification = (<FileReader>event.target).result;
          };

          reader.readAsDataURL(event.target.files[0]);
        }
        this.imageIdentificationToUpload.append('myFile', event.target.files[0], event.target.files[0].name);
        this.imageIdentificationToUpload.append('file', event.target.files[0]);
        this.fileIdentificationSelected = event.target.files[0];

      } else {
        this.toastr.error('Tamaño máximo excedido', 'Imagen');
      }
    } else {
      this.toastr.error('Formato inválido', 'Imagen');
    }

  }

  onSubmit (values) {

    // Validate that image was uploaded
    if(!this.imageIdentificationToUpload.has('myFile')){
      this.toastr.error('Imagen de la cedula es requerida', 'Cédula');
    }else if (this.products.length == 0){
      this.toastr.error('No tiene productos en su carrito', 'Productos');
    }else{
      values.identification = this.model.identification; // add image
      values.products = this.products; // add products
      this.cartService.emptyCart();
      this.orderService.addOrder(values);
      this.dialogRef.closeAll();
      this.orderService.newOrder();
      this.toastr.success('Se agregó un pedido');
    }
  }

  /**
   * remove item to shopping cart function
   * @param item Product
   */
  removeItemCart(item) {
    this.cartService.removeItem(item.id);


  }
}
