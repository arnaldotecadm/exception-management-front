import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DetailByTypeComponent } from "./detail-by-type.component";
import { MatSelectModule } from "@angular/material/select";

@NgModule({
  declarations: [DetailByTypeComponent],
  exports: [DetailByTypeComponent],
  imports: [CommonModule, MatSelectModule],
})
export class DetailByTypeModule {}
