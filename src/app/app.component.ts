import { Component, OnInit, NgZone } from "@angular/core";
import { HomeService } from "./home/home.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {

  constructor(private homeService : HomeService){}

  ngOnInit(): void {
    var win = window.open('', '_self', '');
  win.close();
    let $sidebar = $(".sidebar");

    if ($sidebar.length !== 0) {
      $sidebar.attr("data-color", "purple");
    }
  }
}
