import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-table-generic',
  templateUrl: './table-generic.component.html',
  styleUrls: ['./table-generic.component.scss']
})
export class TableGenericComponent implements OnInit {

  dataSource: any;

  @Input() data;
  @Input() columns;
  @Input() labels;
  @Input() header;
  @Input() subHeader;
  @Input() itemsType;
  @Input() actionAdd;
  @Input() dataIndex;
  @Input() footerValue;

  @Output() callParent = new EventEmitter<string>();
  @Output() addItemRow = new EventEmitter<string>();

  @Output() addItem = new EventEmitter<string>();


  constructor() {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit() {
  }

  actionParent(element){
    this.callParent.next(element);
  }

  addRow(element){
    this.addItemRow.next(element);
  }

  addItemAction(){
    this.addItem.next();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getTotalCost() {
    debugger;
    return this.data.map(t => t.precio).reduce((acc, value) => acc + value, 0);
  }
}
