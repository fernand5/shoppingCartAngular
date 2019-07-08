import {Component, Inject, Input, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormOrderComponent} from '../form-order/form-order.component';

export interface DialogData {
  model: any,
  commerce: any,
  product: any
}

@Component({
  selector: 'app-modal-create',
  templateUrl: './modal-create.component.html',
  styleUrls: ['./modal-create.component.scss']
})
export class ModalCreateComponent implements OnInit {

  @ViewChild(FormOrderComponent, {static: true}) formOrder: FormOrderComponent;


  @Input() headerTitle = `Information`;
  @Input() message = `Information`;
  @Input() classHeader = ``;
  @Input() columns;
  @Input() items;
  @Input() labels;
  @Input() subLabels;


  constructor(public dialogRef: MatDialogRef<ModalCreateComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit() {
  }

  submit(){


    if(this.formOrder.ownerForm.valid){
      this.formOrder.onSubmit(this.formOrder.ownerForm.value);
    }
  }

}
