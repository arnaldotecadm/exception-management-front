import { Component, OnInit } from '@angular/core';
import { HomeService } from './home/home.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private homeService: HomeService) {}

  ngOnInit(): void {
    const $sidebar = $('.sidebar');

    if ($sidebar.length !== 0) {
      $sidebar.attr('data-color', 'purple');
    }
  }
}
