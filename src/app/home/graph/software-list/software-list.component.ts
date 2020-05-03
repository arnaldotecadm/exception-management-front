import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  OnInit,
  Output,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HomeService } from '../../home.service';
import { SoftwareInterface } from '../../software.interface';
import { SoftwareService } from '../../software.service';
import { SoftwareComponent } from './software/software.component';

@Component({
  selector: 'app-software-list',
  templateUrl: './software-list.component.html',
  styleUrls: ['./software-list.component.css'],
})
export class AppSoftwareListComponent implements OnInit {
  @Output() changeApplication = new EventEmitter();
  softwaresList$ = new Subject();

  @ViewChildren(SoftwareComponent) private _softwareComponentList: QueryList<
    any
  >;
  constructor(
    private homeService: HomeService,
    private softwareService: SoftwareService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.homeService
      .getTotalException()
      .pipe(
        tap((dados: any) => {
          dados[0].selecionado = true;
          this.softwaresList$.next(dados);
          this.changeApplication.emit(dados[0]);

          return dados;
        })
      )
      .subscribe((dados: any) => {
        if (dados) {
          dados.forEach((info) => {
            this.softwareService
              .getSoftwareByPublicKey(info.application)
              .subscribe((soft: SoftwareInterface) => {
                info.software = soft;
                this.softwaresList$.next(dados);
                this.cdr.detectChanges();
              });
          });
        }
      });
  }

  mostrarTodos(comp: any) {
    this._softwareComponentList.forEach((componente) => {
      if (componente.software.application === comp.application) {
        componente.software.selecionado = true;
      } else {
        componente.software.selecionado = false;
      }
    });
    this.changeApplication.emit(comp);
  }
}
