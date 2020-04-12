import {
  Component,
  OnInit,
  ViewChildren,
  QueryList,
  Output,
  EventEmitter,
} from "@angular/core";
import { HomeService } from "../../home.service";
import { Subject } from "rxjs";
import { SoftwareComponent } from "./software/software.component";

@Component({
  selector: "app-software-list",
  templateUrl: "./software-list.component.html",
  styleUrls: ["./software-list.component.css"],
})
export class AppSoftwareListComponent implements OnInit {
  @Output() changeApplication = new EventEmitter();

  @ViewChildren(SoftwareComponent) private _softwareComponentList: QueryList<
    SoftwareComponent
  >;
  constructor(private homeService: HomeService) {}

  softwaresList$ = new Subject();

  ngOnInit(): void {
    this.homeService.getTotalException().subscribe((dados: any) => {
      dados[0].selecionado = true;
      this.softwaresList$.next(dados);
      this.changeApplication.emit(dados[0]);
    });
  }

  mostrarTodos(comp: SoftwareComponent) {
    this._softwareComponentList.forEach((componente) => {
      if (componente.application == comp.application) {
        componente.selecionado = true;
      } else {
        componente.selecionado = false;
      }
    });
    this.changeApplication.emit(comp);
  }
}
