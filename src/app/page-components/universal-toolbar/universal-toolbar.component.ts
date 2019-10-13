import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { StateService } from 'src/app/services/state.service';
import { LocalStorageVariables } from 'src/app/models/local-storage';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { ProxyBaseComponent } from '../proxy-base.component';

@Component({
  selector: 'app-universal-toolbar',
  templateUrl: './universal-toolbar.component.html',
  styleUrls: ['./universal-toolbar.component.scss']
})
export class UniversalToolbarComponent implements OnInit {
  selectedTab: string;
  addNotesAndTask: boolean;
  // @Output() tabSelected: EventEmitter<string> = new EventEmitter<string>();

  constructor(private stateService: StateService, private sideBarComponent: SidebarComponent) {
  }
  ngOnInit() {
    this.selectedTab = this.stateService.getValue(LocalStorageVariables.selectedTab);
    this.stateService.getObservableValue(LocalStorageVariables.selectedTab).subscribe((tab: any) => {
      if (tab != null) {
        this.selectedTab = tab;
      }
    });
  }

}
