import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatTableDataSource} from '@angular/material';
import {CartService} from '../../_services/cart.service';
import {Product} from '../../_models/product';
import {TableGenericComponent} from '../table-generic/table-generic.component';
import {ToastrService} from 'ngx-toastr';

export interface DialogData {
  image: string;
  name: string;
  products: any;
  actions: boolean;
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
  displayedColumns: string[] = ['descripcion', 'miniatura', 'precio'];
  constructor(
    private cartService: CartService,
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<ModalGenericComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  ngOnInit() {
    if(this.data.actions){
      this.displayedColumns.push('buttons');
    }
    this.table.dataSource = new MatTableDataSource(this.data.products);

    this.cartService.change.subscribe(result => {
      this.table.dataSource = new MatTableDataSource(this.cartService.getAll());
    });

  }


  /**
   * remove item to shopping cart function
   * @param item Product
   */
  removeItemCart(item) {
    this.cartService.removeItem(item.id);


  }

}
