import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { SortDirectionEnum } from '../sorting-icons/SortDirectionEnum';

@Component({
  selector: 'dn-sorting-demo',
  templateUrl: './sorting-demo.component.html',
  styleUrls: ['./sorting-demo.component.css']
})
export class SortingDemoComponent implements OnInit {

  changeSortDirection = new Subject<{name: string, direction: SortDirectionEnum}>();
  resetSortDirection = new Subject<{name: string, direction: SortDirectionEnum}>();
  sortables = ['title', 'subject'];
  
  log = '';

  constructor() { }

  ngOnInit() {
    this.changeSortDirection.subscribe(
      ({name, direction}) => {
        this.log = `sorting: ${name}, direction: ${direction}`;
        this.sortables.filter(s => s !== name).forEach(
          ss => this.resetSortDirection.next({name: ss})
        );
      }
    );
  }

  resetSort() {
    this.sortables.forEach(s => this.resetSortDirection.next({name: s}));
  }

  setDefaultSort() {
    this.resetSort();
    this.resetSortDirection.next({name: 'subject', direction: SortDirectionEnum.UP})
  }
}