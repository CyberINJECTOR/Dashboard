import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AddPopupTaskComponent } from 'src/app/components/add-popup-task/add-popup-task.component';

@Component({
  selector: 'app-universal-toolbar-container',
  templateUrl: './universal-toolbar-container.component.html',
  styleUrls: ['./universal-toolbar-container.component.scss']
})
export class UniversalToolbarContainerComponent implements OnInit {
  @Input() selectedTab: string;

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddPopupTaskComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
