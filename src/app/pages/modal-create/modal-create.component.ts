import {Component, Inject, Input, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormOrderComponent} from '../form-order/form-order.component';

export interface DialogData {
  model: any,
  product: any
}

@Component({
  selector: 'app-modal-create',
  templateUrl: './modal-create.component.html',
  styleUrls: ['./modal-create.component.scss']
})
export class ModalCreateComponent implements OnInit {

  @ViewChild(FormOrderComponent, {static: true}) formOrder: FormOrderComponent; // Child component (form)

  constructor(public dialogRef: MatDialogRef<ModalCreateComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit() {
  }

  /**
   * Submit form child
   */
  submit(){
    if(this.formOrder.ownerForm.valid){
      this.formOrder.onSubmit(this.formOrder.ownerForm.value);
    }
  }

}
