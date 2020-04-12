import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DetailByTypeComponent } from "./detail-by-type.component";

@NgModule({
  declarations: [DetailByTypeComponent],
  exports: [DetailByTypeComponent],
  imports: [CommonModule],
})
export class DetailByTypeModule {}
