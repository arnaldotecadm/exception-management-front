import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    let $sidebar = $(".sidebar");

    if ($sidebar.length !== 0) {
      $sidebar.attr("data-color", "purple");
    }
  }
}
