import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { PropertyMappingComponent } from './property-mapping/property-mapping.component';
import { StepsComponent } from './steps/steps.component';
import { SortingModule } from './sorting/sorting.module';

@NgModule({
  imports:      [
    BrowserModule,
    FormsModule,
    SortingModule,
  ],
  declarations: [ AppComponent, PropertyMappingComponent, StepsComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
