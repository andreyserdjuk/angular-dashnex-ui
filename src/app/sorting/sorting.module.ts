import { SortingComponent } from "./sorting-collection/sorting.component";
import { BrowserModule } from "@angular/platform-browser";
import { SortingIconsComponent } from "./sorting-icons/sorting-icons.component";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SortingDemoComponent } from './sorting-icons-demo/sorting-demo.component';

@NgModule({
  imports:      [ CommonModule ],
  declarations: [
    SortingIconsComponent,
    SortingDemoComponent,
  ],
  exports: [
    SortingIconsComponent,
    SortingDemoComponent,
  ]
})
export class SortingModule { }