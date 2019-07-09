import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {CartService} from '../../_services/cart.service';
import {ModalGenericComponent} from '../../pages/modal-generic/modal-generic.component';
import {MatDialog, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnDestroy, OnInit {
  // Quantity on cart
  quantityCart: number;

  constructor(changeDetectorRef: ChangeDetectorRef,
              public dialog: MatDialog,
              media: MediaMatcher,
              private cartService: CartService
              ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  mobileQuery: MediaQueryList;

  // Side bar configuracion array
  fillerNav = [
    {path: '/catalog', title: 'Catálogo', icon: 'note', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
    { path: '/orders', title: 'Pedidos', icon: 'note', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
  ];

  private _mobileQueryListener: () => void;

  /**
   * Init with values for shopping cart badge
   */
  ngOnInit() {
    this.quantityCart = this.cartService.getAll().length;
    this.cartService.change.subscribe(result=>{
      this.quantityCart = this.cartService.getAll().length;
    });
  }

  /**
   * Detroy mobileQuery media
   */
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  /**
   * Show items on shopping cart with material modal
   */
  showCart() {
    const _this = this;
    const dialogRef = this.dialog.open(ModalGenericComponent, {
      width: '750px',
      data: {products: _this.cartService.getAll(), actions: true}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
    });
  }

}
