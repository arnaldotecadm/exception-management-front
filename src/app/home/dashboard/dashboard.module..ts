import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DashboardComponent } from "./dashboard.component";
import { SummaryModule } from "../graph/summary/summary.module";
import { TopTrendModule } from "../graph/top-trend/top-trend.module";
import { AppSoftwareListModule } from "../graph/software-list/software-list.module";
import { TopExceptionModule } from "../graph/top-exception/top-exception.module";
import { DetailByTypeModule } from "../graph/detail-by-type/detail-by-type.module";
import { MatExpansionModule } from "@angular/material/expansion";

@NgModule({
  declarations: [DashboardComponent],
  exports: [DashboardComponent],
  imports: [
    CommonModule,
    SummaryModule,
    TopExceptionModule,
    TopTrendModule,
    AppSoftwareListModule,
    DetailByTypeModule,
    MatExpansionModule,
  ],
})
export class DashboardModule {}
