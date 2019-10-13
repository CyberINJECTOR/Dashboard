import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { StateService } from 'src/app/services/state.service';
import { LocalStorageVariables } from 'src/app/models/local-storage';
import { ReduxService } from 'src/app/services/redux-service.service';
import { ReduxVariables } from 'src/app/models/redux';
import { HttpCallService } from 'src/app/services/http-call.service';
import { User } from 'src/app/page-components/profile/UserEntity/user-model';

export interface Section {
  name: string;
  updated: Date;
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  selectedTab: string;
  user: User;
  urlUser: string;
  constructor(private state: StateService, private http: HttpCallService) { }

  ngOnInit() {
    this.user = this.state.getValue(ReduxVariables.updateUser);
    this.state.getObservableValue<User>(ReduxVariables.updateUser).subscribe(user => {
      this.user = new User(user);
      this.urlUser = this.user.urlImg;
    });
  }

  navigate(event: string) {
    this.state.addItem(ReduxVariables.selectedTab, event);
    // this.redux.addItemToStoreRedux(ReduxVariables.selectedTab, event);
    // this.changeEvent.emit(event);
    this.selectedTab = event;
  }
}
