import { Component, OnInit, Output } from '@angular/core';
import { StateService } from 'src/app/services/state.service';
import { HttpCallService } from 'src/app/services/http-call.service';
import { User } from './UserEntity/user-model';
import { ProxyBaseComponent } from '../proxy-base.component';
import { Page } from '../entity/page';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent extends ProxyBaseComponent implements OnInit {
  protected readonly tab = Page.profile;
  constructor(public httpService: HttpCallService, public stateService: StateService) {
    super(httpService, stateService);
  }

  ngOnInit() {
    this.initialize();
  }

}
