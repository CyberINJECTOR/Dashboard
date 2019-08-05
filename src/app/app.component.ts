import { Component, OnInit } from '@angular/core';
import { StateService } from './services/state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  sideBarIsOpened = true;

  constructor() {
   }

  ngOnInit() {
  }

  toggleUniversalToolBar() {
    this.sideBarIsOpened = !this.sideBarIsOpened;
    console.log(this.sideBarIsOpened);
  }
}
