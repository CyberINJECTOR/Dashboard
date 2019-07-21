import { Component, OnInit } from '@angular/core';
import { HttpCallService } from 'src/app/services/http-call.service';
import { Observable } from 'rxjs';
import { Event } from '../../page-components/evento/event';
import { EventColums } from '../../models/event-colums';
import { StateService } from 'src/app/services/state.service';
import { localStorageVariables } from 'src/app/models/local-storage';

@Component({
  selector: 'app-evento',
  templateUrl: './evento.component.html',
  styleUrls: ['./evento.component.scss']
})

export class EventoComponent implements OnInit {
  displayedColumns = ['id','img_url', 'description','id_EventType', 'created_ad', 'updated_ad', 'edit', 'delete'];
  titles = ['id', 'description', 'img_url','id_EventType', 'created_ad', 'updated_ad'];
  dataSource = ELEMENT_DATA;
  eventsArrayList: Event[];
  eventColumns: EventColums;

  constructor(private _stateService: StateService, private _httpCall: HttpCallService) {
    this._httpCall.getAllEvents('getAllEvents').subscribe((res: Event[]) =>
    {
      this.eventsArrayList = res;
    });

    const selectedTab = this._stateService.getItem(localStorageVariables.selectedTab)
  }



  ngOnInit() {
  }

}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];