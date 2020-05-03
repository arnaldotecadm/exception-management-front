import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';
import { AppSoftwareListComponent } from './software-list.component';
import { SoftwareComponent } from './software/software.component';

@NgModule({
  declarations: [AppSoftwareListComponent, SoftwareComponent],
  exports: [AppSoftwareListComponent],
  imports: [CommonModule, NgbPopoverModule],
})
export class AppSoftwareListModule {}
