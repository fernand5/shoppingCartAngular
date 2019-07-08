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

  public ownerForm: FormGroup;

  fileIdentificationSelected: File;
  imageIdentificationToUpload: FormData;
  products: Product[];


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
    }

  ];
  displayedColumns: string[] = ['descripcion', 'miniatura', 'precio'];


  cities = [
    {value: 'Medellin'},
    {value: 'Envigado'},
    {value: 'Sabaneta'}
  ];


  @Input() header = `Information`;
  @Input() model: any;
  @Input() commerceId: any;
  @Input() idToProductUpdate: any;

  @ViewChild('product', { static: true, read: NgForm }) form: any;

  constructor(private dialogRef: MatDialog,
              private toastr: ToastrService,
              private cartService: CartService,
              private orderService: OrderService) {
    this.imageIdentificationToUpload = new FormData();


  }

  ngOnInit() {
    this.ownerForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      dateOfBirth: new FormControl(new Date()),
      address: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      city: new FormControl('', [Validators.required])

    });
    this.products = this.cartService.getAll();

    this.table.dataSource = new MatTableDataSource(this.products);
  }


  public hasError = (controlName: string, errorName: string) =>{
    return this.ownerForm.controls[controlName].hasError(errorName);
  }


  onFileProductChanged(event) {
    const uploadData = new FormData();

    const allowedExtensions = ['PDF', 'pdf'];
    const fileExtension = event.target.files[0].name.split('.').pop();

    if (allowedExtensions.includes(fileExtension)) {
debugger;
      if (event.target.files[0].size < 1000000) {

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

    if(!this.imageIdentificationToUpload.has('myFile') && this.model.detailPictureUrl == null){
      this.toastr.error('Imagen de la cedula es requerida', 'Cédula');
    }else{
      values.identification = this.model.identification;
      values.products = this.products;
      this.cartService.emptyCart();
      this.orderService.addOrder(values);
      this.dialogRef.closeAll();
      this.orderService.newOrder();
      this.toastr.success('Se agregó un pedido');
    }

  }

  instructionsChanged(event) {
    this.model.allowInstructions = event.target.checked;
  }

  close() {
    this.dialogRef.closeAll();
  }

  priceChange() {
    this.model.taxedPrice = (parseFloat(this.model.price) * 0.16) + parseFloat(this.model.price);
  }
}
