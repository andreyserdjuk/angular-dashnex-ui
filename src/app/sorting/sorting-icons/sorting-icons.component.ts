import { Component, OnInit, Input } from '@angular/core';
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
  public sortTextClass = ['sort-text'];

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
          this.setArrowsClass(FilterStateEnum.ENABLED, FilterStateEnum.INVISIBLE);
        } else {
          this.setArrowsClass(FilterStateEnum.INVISIBLE, FilterStateEnum.ENABLED);
        }
      }
    });
  }

  switchSort() {
    if (FilterStateEnum.DISABLED === this.upFilterState && FilterStateEnum.DISABLED === this.downFilterState ||
        FilterStateEnum.INVISIBLE === this.upFilterState && FilterStateEnum.ENABLED === this.downFilterState
    ) {
      this.setArrowsClass(FilterStateEnum.ENABLED, FilterStateEnum.INVISIBLE);
      this.outputChangeSortDirection.next({name: this.name, direction: SortDirectionEnum.UP});
      return;
    }

    if (FilterStateEnum.ENABLED === this.upFilterState && 
        FilterStateEnum.INVISIBLE === this.downFilterState
    ) {
      this.setArrowsClass(FilterStateEnum.INVISIBLE, FilterStateEnum.ENABLED);
      this.outputChangeSortDirection.next({name: this.name, direction: SortDirectionEnum.DOWN});
      return;
    }
  }

  private setArrowsClass(up, down) {
    this.upFilterState = up;
    this.downFilterState = down;
    this.sortTextClass = ['sort-text'];

    if (FilterStateEnum.ENABLED === up) {
      this.sortTextClass = ['sort-text', SortDirectionEnum.UP];
    } else if (FilterStateEnum.ENABLED === down) {
      this.sortTextClass = ['sort-text', SortDirectionEnum.DOWN];
    }
    
    this.upFilterClass = ['sort-up', up];
    this.downFilterClass = ['sort-down', down];
  }
}
