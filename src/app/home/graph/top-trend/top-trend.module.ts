import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TopTrendComponent } from "./top-trend.component";

@NgModule({
  declarations: [TopTrendComponent],
  exports: [TopTrendComponent],
  imports: [CommonModule],
})
export class TopTrendModule {}
