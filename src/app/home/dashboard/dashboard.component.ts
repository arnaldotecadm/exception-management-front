import { Component, OnInit, ViewChild } from "@angular/core";
import { MatAccordion } from "@angular/material/expansion";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
})
export class DashboardComponent implements OnInit {
  @ViewChild(MatAccordion, { static: true }) accordion: MatAccordion;

  selectedApplication: string = "";

  topExceptionState = true;
  topTrendExceptionState = true;
  detailExceptionState = true;

  constructor() {}

  ngOnInit() {}

  toggleState(comp, state: boolean) {
    if (state) {
      $("#" + comp).show();
    } else {
      $("#" + comp).hide();
    }
  }
  changeApplication(componente) {
    this.selectedApplication = componente.application;
    if (this.accordion) {
      //this.accordion.openAll();
    }
  }

  openTopExceptionPanel() {
    this.topExceptionState = true;
    this.toggleState("top-exception", true);
  }

  closeTopExceptionPanel(panel) {
    this.topExceptionState = false;
    this.toggleState("top-exception", false);
    panel.toggle();
  }

  openTopTrendPanel() {
    this.topTrendExceptionState = true;
    this.toggleState("top-trend-exception", true);
  }
  closeTopTrendPanel(panel) {
    this.topTrendExceptionState = false;
    this.toggleState("top-trend-exception", false);
    panel.toggle();
  }

  openDetailPanel() {
    this.detailExceptionState = true;
    this.toggleState("detail-exception", true);
  }
  closeDetailPanel(panel) {
    this.detailExceptionState = false;
    this.toggleState("detail-exception", false);
    panel.toggle();
  }
}
