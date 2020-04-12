import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  AfterContentInit,
} from "@angular/core";

@Component({
  selector: "app-software",
  templateUrl: "./software.component.html",
  styleUrls: ["./software.component.scss"],
})
export class SoftwareComponent implements OnInit {
  @Input() totalExceptions;
  @Input() application;
  @Input() public selecionado = false;

  color: any;

  constructor() {}

  ngOnInit(): void {
    this.color =
      "rgb(" +
      Math.floor(Math.random() * 255) +
      "," +
      Math.floor(Math.random() * 255) +
      "," +
      Math.floor(Math.random() * 255) +
      ")";
  }
}
