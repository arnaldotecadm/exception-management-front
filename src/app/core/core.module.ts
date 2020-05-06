import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SigninComponent } from './signin/signin.component';
import { ReactiveFormsModule } from '@angular/forms';
import { VMessageModule } from '../components/shared/vmessage/vmessage.module';

@NgModule({
  declarations: [SigninComponent],
  imports: [CommonModule, ReactiveFormsModule, VMessageModule],
  exports: [SigninComponent],
})
export class CoreModule {}
