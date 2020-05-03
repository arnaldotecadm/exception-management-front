import {
  Component,
  OnInit,
  Inject,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogData } from '../../dialogData';
import { ExceptionService } from '../../exception-components/exception.service';
import { ExceptionModel } from '../../exception-components/exceptionModel';

@Component({
  selector: 'app-modal-filters',
  templateUrl: './modal-filters.component.html',
  styleUrls: ['./modal-filters.component.css'],
})
export class ModalFiltersComponent implements OnInit {
  exception: ExceptionModel;

  id: any;
  unitName: any;
  className: any;
  componentName: any;
  importantLine: any;
  detail: any;
  versionName: any;
  aplicacao: any;
  versionType: any;

  constructor(
    private exceptionService: ExceptionService,
    public dialogRef: MatDialogRef<ModalFiltersComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {}
}
