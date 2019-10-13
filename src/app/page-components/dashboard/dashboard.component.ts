import { Component, OnInit } from '@angular/core';
import { StateService } from 'src/app/services/state.service';
import { ProxyBaseComponent } from '../proxy-base.component';
import { Page } from '../entity/page';
import { HttpCallService } from 'src/app/services/http-call.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent extends ProxyBaseComponent implements OnInit {
  protected readonly tab = Page.dashboard;
  constructor(
    stateService: StateService,
    httpCall: HttpCallService
  ) {
    super(httpCall, stateService);
  }

  ngOnInit() {
    this.initialize();
  }

}
