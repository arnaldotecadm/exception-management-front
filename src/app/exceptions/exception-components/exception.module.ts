
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { ExceptionComponent } from './exception/exception.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [ExceptionComponent],
  imports: [
    CommonModule,
    MatCheckboxModule,
    MatDialogModule,
    MatFormFieldModule,
    MatButtonModule,
    MatTableModule,
  ],
  exports: [FormsModule,
    MatTableModule,
    MatTabsModule,
    ExceptionComponent
  ],
})

export class ExceptionlModule { }