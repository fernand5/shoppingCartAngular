import {Component, OnInit, ViewChild} from '@angular/core';
import {Order} from '../../_models/order';
import {MatDialog, MatTableDataSource, PageEvent} from '@angular/material';
import {ModalGenericComponent} from '../modal-generic/modal-generic.component';
import {OrderService} from '../../_services/order.service';
import {ModalCreateComponent} from '../modal-create/modal-create.component';
import {FormOrderComponent} from '../form-order/form-order.component';
import {TableGenericComponent} from '../table-generic/table-generic.component';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  @ViewChild(TableGenericComponent, {static: true}) table: TableGenericComponent;

  orders: Order[];
  itemsType = [
    {
      index: 'id',
      title: 'No.',
      type: 'number',
    },
    {
      index: 'name',
      title: 'Nombre',
      type: 'text',
    },
    {
      index: 'dateOfBirth',
      title: 'Fecha de nacimiento',
      type: 'date',
    },
    {
      index: 'address',
      title: 'Dirección de envío',
      type: 'text',
    },
    {
      index: 'city',
      title: 'Ciudad',
      type: 'text',
    },
    {
      index: 'identification',
      title: 'Cédula',
      type: 'text',
      action: true,
      customLabel: 'Descargar'
    },
    {
      index: 'products',
      title: 'Productos',
      type: 'text',
      viewRowAction: true,
      customLabel: 'Ver'
    },

  ];
  displayedColumns: string[] = ['id', 'name', 'dateOfBirth', 'address', 'city', 'identification', 'products'];
  // MatPaginator Inputs
  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  // MatPaginator Output
  pageEvent: PageEvent;

  constructor(public dialog: MatDialog,
              private ordersService: OrderService) { }

  ngOnInit() {
    this.orders = this.ordersService.getAll();
    this.table.dataSource = new MatTableDataSource(this.orders);


    this.ordersService.change.subscribe(result => {
      this.orders = this.ordersService.getAll();
      this.table.dataSource = new MatTableDataSource(this.orders);

    });
  }

  addItem(){
    const dialogRef = this.dialog.open(ModalCreateComponent, {
      width: '750px',
      data: {model: Order}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);

    });
  }

  download(item) {
    let link = document.createElement('a');
    link.download = 'cedula';
    link.href = item.identification;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    // delete link;

  }

  viewRow(index){
    debugger;
    const dialogRef = this.dialog.open(ModalGenericComponent, {
      width: '750px',
      data: {products: index.products, actions: false}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
    });
  }

}
