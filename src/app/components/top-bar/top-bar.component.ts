import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddPopupTaskComponent } from '../add-popup-task/add-popup-task.component';
import { StateService } from 'src/app/services/state.service';
import { LocalStorageVariables } from 'src/app/models/local-storage';
import { ReduxVariables } from 'src/app/models/redux';
import { User } from 'src/app/page-components/profile/UserEntity/user-model';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {
  selectedTab: string;
  user: User;
  urlUser: string;
  constructor(public dialog: MatDialog, private stateService: StateService) { }

  ngOnInit() {
    this.selectedTab = this.stateService.getValue<string>(ReduxVariables.selectedTab);
    this.stateService.getObservableValue<string>(ReduxVariables.selectedTab).subscribe((tab: any) => {
      if (tab != null) {
        this.selectedTab = tab;
      }
    });

    this.stateService.getObservableValue<User>(ReduxVariables.updateUser).subscribe(user => {
      this.user = new User(user);
      this.urlUser = this.user.urlImg;
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddPopupTaskComponent, {
      width: '300px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
