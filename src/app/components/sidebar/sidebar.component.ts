import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { StateService } from 'src/app/services/state.service';
import { LocalStorageVariables } from 'src/app/models/local-storage';

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

  folders: Section[] = [
    {
      name: 'Photos',
      updated: new Date('1/1/16'),
    },
    {
      name: 'Recipes',
      updated: new Date('1/17/16'),
    },
    {
      name: 'Work',
      updated: new Date('1/28/16'),
    }
  ];
  notes: Section[] = [
    {
      name: 'Vacation Itinerary',
      updated: new Date('2/20/16'),
    },
    {
      name: 'Kitchen Remodel',
      updated: new Date('1/18/16'),
    }
  ];
  @Output() changeEvent: EventEmitter<any> = new EventEmitter<any>();
  selectedTab: string;
  constructor(private state: StateService) { }

  ngOnInit() {
  }

  navigate(event: string) {
    this.state.addItem(LocalStorageVariables.selectedTab, event);
    this.changeEvent.emit(event);
    this.selectedTab = event;
  }
}
