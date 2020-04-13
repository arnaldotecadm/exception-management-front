import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { DialogData } from "../../dialogData";
import { ExceptionService } from "../../exception-components/exception.service";
import { ExceptionModel } from "../../exception-components/exceptionModel";

@Component({
  selector: "app-modal",
  templateUrl: "./modal.component.html",
  styleUrls: ["./modal.component.css"],
})
export class ModalComponent implements OnInit {
  listExceptions: ExceptionModel[] = [];

  constructor(
    private exceptionService: ExceptionService,
    public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.exceptionService
      .getPaged(0, 50)
      .subscribe((exceptions) => (this.listExceptions = exceptions.content)),
      console.log(JSON.stringify(this.listExceptions));
    (err) => {
      return console.log(err);
    };
  }
}
