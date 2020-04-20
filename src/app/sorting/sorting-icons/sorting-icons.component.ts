import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FilterStateEnum } from './FilterStateEnum';
import { SortDirectionEnum } from './SortDirectionEnum';
import { Observable, Subject } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'dn-sorting-icons',
  templateUrl: './sorting-icons.component.html',
  styleUrls: ['./sorting-icons.component.scss']
})
export class SortingIconsComponent implements OnInit {

  @Input() outputChangeSortDirection: Subject<{name: string, direction: SortDirectionEnum}>;
  @Input() inputSetSortDirection: Observable<{name: string, direction?: SortDirectionEnum}>;
  @Input() name: string;
  @Input() fontSize: string;

  public sortBlockStyle = {};

  public upFilterClass = ['sort-up', FilterStateEnum.DISABLED];
  public downFilterClass = ['sort-up', FilterStateEnum.DISABLED];

  private upFilterState = FilterStateEnum.DISABLED;
  private downFilterState = FilterStateEnum.DISABLED;

  constructor() { }

  ngOnInit() {
    this.sortBlockStyle['font-size'] = this.fontSize;
    this.inputSetSortDirection.pipe(
      filter(({name}) => name === this.name)
    ).subscribe(({name, direction}) => {
      if (!direction) {
        this.setArrowsClass(FilterStateEnum.DISABLED, FilterStateEnum.DISABLED);
      } else {
        if (direction === SortDirectionEnum.UP) {
          this.upFilterState = FilterStateEnum.ENABLED;
          this.downFilterState = FilterStateEnum.DISABLED;
        } else {
          this.upFilterState = FilterStateEnum.DISABLED;
          this.downFilterState = FilterStateEnum.ENABLED;
        }
        this.upFilterClass = ['sort-up', this.upFilterState];
        this.downFilterClass = ['sort-down', this.downFilterState];
      }
    });
  }

  switchSort() {
    if (FilterStateEnum.DISABLED === this.upFilterState && 
        FilterStateEnum.DISABLED === this.downFilterState
    ) {
      this.setArrowsClass(FilterStateEnum.ENABLED, FilterStateEnum.INVISIBLE);
      return;
    }

    if (FilterStateEnum.ENABLED === this.upFilterState && 
        FilterStateEnum.INVISIBLE === this.downFilterState
    ) {
      this.setArrowsClass(FilterStateEnum.INVISIBLE, FilterStateEnum.ENABLED);
      return;
    }

    if (FilterStateEnum.INVISIBLE === this.upFilterState && 
        FilterStateEnum.ENABLED === this.downFilterState
    ) {
      this.setArrowsClass(FilterStateEnum.ENABLED, FilterStateEnum.INVISIBLE);
      return;
    }
  }

  private setArrowsClass(up, down) {
    this.upFilterState = up;
    this.downFilterState = down;

    if (FilterStateEnum.ENABLED === up) {
      this.outputChangeSortDirection.next({name: this.name, direction: SortDirectionEnum.UP});
    } else if (FilterStateEnum.ENABLED === down) {
      this.outputChangeSortDirection.next({name: this.name, direction: SortDirectionEnum.DOWN});
    }
    
    this.upFilterClass = ['sort-up', up];
    this.downFilterClass = ['sort-down', down];
  }
}
