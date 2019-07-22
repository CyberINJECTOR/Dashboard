import { Component, OnInit, Input } from '@angular/core';
import { StateService, IStateEvent } from 'src/app/services/state.service';
import { localStorageVariables } from 'src/app/models/local-storage';
import { Observable } from 'rxjs';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { inherits } from 'util';
import { ProxyBaseComponent } from '../proxy-base.component';

@Component({
  selector: 'app-universal-toolbar',
  templateUrl: './universal-toolbar.component.html',
  styleUrls: ['./universal-toolbar.component.scss']
})
export class UniversalToolbarComponent extends ProxyBaseComponent implements OnInit {
  selectedTab: string;

  constructor(private stateService: StateService, private sideBarComponent: SidebarComponent) {
    super(stateService);
  }
  ngOnInit() {
    this.selectedTab = this.stateService.getItem(localStorageVariables.selectedTab);



    this.sideBarComponent.changeEvent.subscribe((sstring: string) => {
      console.log(sstring);
      this.selectedTab = sstring;
    });

    this.stateService.getObservableItem(localStorageVariables.selectedTab).subscribe((selectedTab: IStateEvent) => {
      if (selectedTab) {
        this.selectedTab = selectedTab.value;
      }
    });
  }

  public changeEventCalled(eventArgs: any) {

    this.stateService.getObservableItem(localStorageVariables.selectedTab).
      subscribe((selectedTab: IStateEvent) => {
        if (selectedTab) {
          this.selectedTab = selectedTab.value;
        }
      });
    // this.selectedTab = eventArgs;
    // console.log(eventArgs);
  }

}