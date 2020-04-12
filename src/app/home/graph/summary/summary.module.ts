import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SummaryComponent } from "./summary.component";

@NgModule({
  declarations: [SummaryComponent],
  exports: [SummaryComponent],
  imports: [CommonModule],
})
export class SummaryModule {}
