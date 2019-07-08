import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatTableDataSource} from '@angular/material';
import {CartService} from '../../_services/cart.service';
import {Product} from '../../_models/product';
import {TableGenericComponent} from '../table-generic/table-generic.component';

export interface DialogData {
  image: string;
  name: string;
}

@Component({
  selector: 'app-modal-generic',
  templateUrl: './modal-generic.component.html',
  styleUrls: ['./modal-generic.component.scss']
})
export class ModalGenericComponent implements OnInit {
  @ViewChild(TableGenericComponent, {static: true}) table: TableGenericComponent;

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
  constructor(
    private cartService: CartService,
    public dialogRef: MatDialogRef<ModalGenericComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  ngOnInit() {
    debugger;
    this.products = this.cartService.getAll();

    this.table.dataSource = new MatTableDataSource(this.products);

    this.getTotalCost();


  }

  /** Gets the total cost of all transactions. */
  getTotalCost() {
    console.log(this.products.map(t => t.precio).reduce((acc, value) => acc + value, 0));
    // return this.products.map(t => t.precio).reduce((acc, value) => acc + value, 0);
  }


}
