import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AddPopupTaskComponent } from 'src/app/components/add-popup-task/add-popup-task.component';
import { StateService } from 'src/app/services/state.service';
import { ReduxVariables } from 'src/app/models/redux';

@Component({
  selector: 'app-universal-toolbar-container',
  templateUrl: './universal-toolbar-container.component.html',
  styleUrls: ['./universal-toolbar-container.component.scss']
})
export class UniversalToolbarContainerComponent implements OnInit {
  @Input() selectedTab: string;

  constructor(private dialog: MatDialog, private stateService: StateService) { }

  ngOnInit() {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddPopupTaskComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });

    dialogRef.componentInstance.closeAddPopUp.subscribe(() => {
      this.dialog.closeAll();
    });

    dialogRef.componentInstance.newEntitySaved.subscribe((result) => {
      console.log(result);
    });
  }

  openFindElementPanel() {
    this.stateService.addItem(ReduxVariables.showFindPanel, true);
  }

}
