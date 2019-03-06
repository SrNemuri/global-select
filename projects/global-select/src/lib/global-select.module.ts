import { NgModule } from '@angular/core';
import { GlobalSelectComponent } from './global-select.component';
import { CommonModule } from '@angular/common';
import { FormsModule  } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ScrollerDirective } from './directives/scroller.directive';

@NgModule({
  declarations: [GlobalSelectComponent, ScrollerDirective],
  imports: [CommonModule, FormsModule, BrowserAnimationsModule],
  exports: [GlobalSelectComponent]
})
export class GlobalSelectModule { }
