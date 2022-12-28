import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  songLink: any = 'https://www.youtube.com/watch?v=K2rwxs1gH9w';
  constructor() {}

  ngOnInit(): void {
    // this.songLink.play();
  }
}
