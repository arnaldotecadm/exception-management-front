import { Component, OnInit, OnDestroy, ViewChild } from "@angular/core";
import { ExceptionModel } from "../exceptionModel";
import { ExceptionService } from "../exception.service";
import { Observable, Subscription } from "rxjs";

import { MatDialog } from "@angular/material/dialog";
import { ModalFiltersComponent } from "../../modals/modal-filters/modal-filters.component";
import { ModalComponent } from "../../modals/modal/modal.component";

import { MatPaginator } from "@angular/material/paginator";

@Component({
  selector: "app-exception",
  templateUrl: "./exception.component.html",
  styleUrls: ["./exception.component.css"],
})
export class ExceptionComponent implements OnInit, OnDestroy {
  @ViewChild("paginacao", { static: true }) paginacao: MatPaginator;

  listExceptions: ExceptionModel[] = [];
  liveReloading = false;
  interval: any;

  consulta: Subscription[] = [];

  id: any;
  stackTrace: any;
  importantLine: String;

  constructor(
    private exceptionService: ExceptionService,
    public dialog: MatDialog
  ) {}

  public alterouPagina(pagina: any) {
    console.log(pagina);
    this.removerSubscriptions();
    this.pageActual = pagina.pageIndex;
    this.pageSize = pagina.pageSize;

    this.realizarConsulta();
  }

  totalRegistros: number;
  pageSize: number = 30;
  pageActual: number = 0;

  ngOnInit(): void {
    this.realizarConsulta();
  }

  private realizarConsulta() {
    this.consulta.push(
      this.exceptionService
        .getPaged(this.pageActual, this.pageSize)
        .subscribe((exceptions) => {
          this.listExceptions = exceptions.content;
          this.totalRegistros = exceptions.totalElements;
        })
    );
  }

  toggleCheckbox(habilitar) {
    this.liveReloading = habilitar;
    if (habilitar == true) {
      this.interval = setInterval(() => {
        this.realizarConsulta();
      }, 2000);
    } else {
      if (this.interval) {
        clearInterval(this.interval);
      }
    }
  }

  openDialog(idException: ExceptionModel, importantLine: String): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: "900px",
      data: {
        stackTrace: this.stackTrace = idException,
        importantLine: this.importantLine = importantLine,
      },
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.stackTrace = result;
    });
  }

  openDialogFilter(): void {
    const dialogRef = this.dialog.open(ModalFiltersComponent, {
      width: "900px",
      data: { id: 33 },
    });
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
    this.removerSubscriptions();
  }

  removerSubscriptions() {
    this.consulta.forEach((element) => {
      console.log("Destruindo Componente");
      element.unsubscribe();
    });
  }
}
