import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-software',
  templateUrl: './software.component.html',
  styleUrls: ['./software.component.scss'],
})
export class SoftwareComponent implements OnInit {
  @Input() software: any;

  color: any;

  constructor() {}

  ngOnInit(): void {
    this.color =
      'rgb(' +
      Math.floor(Math.random() * 255) +
      ',' +
      Math.floor(Math.random() * 255) +
      ',' +
      Math.floor(Math.random() * 255) +
      ')';
  }
}
