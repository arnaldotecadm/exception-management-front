import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AppSoftwareListComponent } from "./software-list.component";
import { SoftwareComponent } from './software/software.component';

@NgModule({
  declarations: [AppSoftwareListComponent, SoftwareComponent],
  exports: [AppSoftwareListComponent],
  imports: [CommonModule],
})
export class AppSoftwareListModule {}
