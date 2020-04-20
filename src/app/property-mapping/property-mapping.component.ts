import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-property-mapping',
  templateUrl: './property-mapping.component.html',
  styleUrls: ['./property-mapping.component.css']
})
export class PropertyMappingComponent {

  @Input() mapping: {
    key: string,
    label: string,
    required: boolean,
  }[];

  @Input() tableData: string[][];

  @Output() propertyToColumnMapping = new EventEmitter<{[key: string]: number}>();

  private _propertyToColumnMapping: {[key: string]: number} = {};

  setMapping(columnIndex, mapKey) {
    this._propertyToColumnMapping[mapKey] = columnIndex;
    this.propertyToColumnMapping.emit(this._propertyToColumnMapping);
  }
}
