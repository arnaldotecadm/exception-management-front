import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatSelectModule } from "@angular/material/select";
import { MatFormFieldModule } from "@angular/material/form-field";
import { DashboardModule } from "./dashboard/dashboard.module.";

@NgModule({
  declarations: [],
  imports: [CommonModule, MatSelectModule, MatFormFieldModule, DashboardModule],
  exports: [],
})
export class HomeModule {}
