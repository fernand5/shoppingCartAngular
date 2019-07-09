import {ProductService} from '../../_services/product.service';
import {Product} from '../../_models/product';
import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatTableDataSource, PageEvent} from '@angular/material';
import {ModalGenericComponent} from '../modal-generic/modal-generic.component';
import {TableGenericComponent} from '../table-generic/table-generic.component';
import {CartService} from '../../_services/cart.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {

  @ViewChild(TableGenericComponent, {static: true}) table: TableGenericComponent;

  // Products array
  products: Product;

  // Items and their types for table configuration
  itemsType = [
    {
      index: 'descripcion',
      title: 'Descripcion',
      type: 'text',
    },
    {
      index: 'categoria',
      title: 'Categoria',
      type: 'text',
    },
    {
      index: 'miniatura',
      title: 'Imagen',
      type: 'image',
      action: true
    },
    {
      index: 'precio',
      title: 'Precio',
      type: 'currency',
    },
    {
      index: 'cantidadDisponible',
      title: 'Cantidad Disponible',
      type: 'number'
    },
    {
      index: 'buttons',
      title: 'Acciones',
      type: 'buttons',
      buttons: [
        {
          addRowAction: true,
          icon: 'add_shopping_cart',
        }
      ],
      addRowAction: true,
      customLabel: 'Agregar',
    }

  ];
  displayedColumns: string[] = ['descripcion', 'categoria', 'miniatura', 'precio', 'cantidadDisponible',  'buttons'];
  // MatPaginator Inputs
  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  // MatPaginator Output
  pageEvent: PageEvent;

  constructor(private productService: ProductService,
              private cartService: CartService,
              private toastr: ToastrService,
              public dialog: MatDialog) {
    this.products = new Product();
  }

  /**
   * Fill dataSource table with values from products API
   */
  ngOnInit() {
    this.productService.getAll().subscribe(products => {
      // @ts-ignore
      this.table.dataSource = new MatTableDataSource(products);

    });
  }

  /**
   * Function to show some modal with a big image
   * @param index Item to show in big modal
   */
  openModal(index) {
    const _this = this;
    this.productService.get(index.idProducto).subscribe(product => {
      const dialogRef = _this.dialog.open(ModalGenericComponent, {
        width: '750px',
        data: {name: product.descripcion, image: product.imagen}
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
      });
    });
  }

  /**
   * Add item to shopping cart function
   * @param item Product
   */
  addItemCart(item) {
    if(item.cantidadDisponible > 0){
      this.cartService.addItem(item);
      this.toastr.success(item.descripcion, 'Se agrego un producto a tu carrito');
    }else{
      this.toastr.error(item.descripcion, 'Producto no disponible');

    }

  }



}
