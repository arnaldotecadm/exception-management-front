import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { DashboardModule } from './dashboard/dashboard.module.';

@NgModule({
  declarations: [],
  imports: [CommonModule, MatSelectModule, MatFormFieldModule, DashboardModule],
  exports: [],
})
export class HomeModule {}
