import { Component, OnInit, OnDestroy } from '@angular/core';
import { ExceptionModel } from '../exceptionModel';
import { ExceptionService } from '../exception.service';
import { Observable, Subscription } from 'rxjs';

import {MatDialog} from '@angular/material/dialog';
import { ModalFiltersComponent } from '../../modals/modal-filters/modal-filters.component';
import { ModalComponent } from '../../modals/modal/modal.component';

@Component({
  selector: 'app-exception',
  templateUrl: './exception.component.html',
  styleUrls: ['./exception.component.css'],
})
export class ExceptionComponent implements OnInit, OnDestroy {

  listExceptions: ExceptionModel[] = [];
  liveReloading = false;
  interval : any;

  consulta : Subscription[] = [];

  id: any;
  stackTrace: any;
  importantLine: String;

  constructor(
    private exceptionService: ExceptionService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    let $sidebar = $('.sidebar');

    if ($sidebar.length !== 0) {
      $sidebar.attr('data-color', 'purple');
    }

    this.consulta.push(this.exceptionService.getAll()
      .subscribe(
        exceptions => {
          this.listExceptions = exceptions;
        }
      ));

  }

  toggleCheckbox(habilitar) {
    this.liveReloading = habilitar;
    if (habilitar == true) {
      this.interval = setInterval(() => {
        this.consulta.push(this.exceptionService.getAll()
          .subscribe(
            exceptions => {
              this.listExceptions = exceptions;
              console.log('Executou');
            }
          ));
      }, 2000);
    } else {
      if (this.interval) {
        clearInterval(this.interval);
      }
    }
  }

  openDialog(idException: ExceptionModel, importantLine: String): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '900px',
      data: {
        stackTrace: this.stackTrace = idException,
        importantLine: this.importantLine = importantLine
      },
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      this.stackTrace = result;
    });
  }

  openDialogFilter(): void {
    const dialogRef = this.dialog.open(ModalFiltersComponent, {
      width: '900px',
      data: { id: 33 }
    });
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
    this.consulta.forEach(element => {
      console.log('Destruindo Componente');
      element.unsubscribe();
    });
  }
}
