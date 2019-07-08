import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatTableDataSource} from '@angular/material';
import {CartService} from '../../_services/cart.service';
import {Product} from '../../_models/product';
import {TableGenericComponent} from '../table-generic/table-generic.component';

export interface DialogData {
  image: string;
  name: string;
  products: any;
}

@Component({
  selector: 'app-modal-generic',
  templateUrl: './modal-generic.component.html',
  styleUrls: ['./modal-generic.component.scss']
})
export class ModalGenericComponent implements OnInit {
  @ViewChild(TableGenericComponent, {static: true}) table: TableGenericComponent;

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
  constructor(
    private cartService: CartService,
    public dialogRef: MatDialogRef<ModalGenericComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  ngOnInit() {
    this.table.dataSource = new MatTableDataSource(this.data.products);
    debugger;

  }



}
