import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-table-generic',
  templateUrl: './table-generic.component.html',
  styleUrls: ['./table-generic.component.scss']
})
export class TableGenericComponent implements OnInit {

  dataSource: any; // MatTableDataSoruce to store values

  @Input() columns; // Columns to display
  @Input() header; // Header text
  @Input() subHeader; // Sub Header text
  @Input() itemsType; // Configuration of each columns
  @Input() actionAdd; // Boolean if add button will be displayed

  @Output() callParent = new EventEmitter<string>(); // Call parent action
  @Output() addItemRow = new EventEmitter<string>(); // Parent action to add function for each row
  @Output() viewItemRow = new EventEmitter<string>(); // Parent action to view function
  @Output() removeItemRow = new EventEmitter<string>(); // Parent action to delete function

  @Output() addItem = new EventEmitter<string>(); // Call Parent to add element to array

  constructor() {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit() {
  }

  /**
   * Call parent action
   * @param element Item to parent function
   */
  actionParent(element) {
    this.callParent.next(element);
  }

  /**
   * Call parent action to add
   * @param element Item to parent function
   */
  addRow(element) {
    this.addItemRow.next(element);
  }

  /**
   * Call parent action to show element
   * @param element Item to parent function
   */
  viewRow(element) {
    this.viewItemRow.next(element);
  }

  /**
   * Call parent action remove item
   * @param element Item to parent function
   */
  removeItem(element) {
    this.removeItemRow.next(element);
  }

  /**
   * Call parent action to add element to array
   * @param element Item to parent function
   */
  addItemAction() {
    this.addItem.next();
  }

  /**
   * Filter for each element on table
   * @param filterValue Text to shearch on datasource
   */
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
