import { Component, OnInit } from '@angular/core';
import { HttpCallService } from 'src/app/services/http-call.service';
import { Observable } from 'rxjs';
import { Event } from '../../page-components/evento/event';
import { EventColums } from '../../models/event-colums';
import { StateService } from 'src/app/services/state.service';
import { LocalStorageVariables } from 'src/app/models/local-storage';

@Component({
  selector: 'app-evento',
  templateUrl: './evento.component.html',
  styleUrls: ['./evento.component.scss']
})

export class EventoComponent implements OnInit {
  displayedColumns = ['id', 'img_url', 'description', 'id_EventType', 'created_ad', 'updated_ad', 'edit', 'delete'];
  titles = ['id', 'description', 'img_url', 'id_EventType', 'created_ad', 'updated_ad'];
  eventsArrayList: Event[];
  eventColumns: EventColums;

  constructor(private httpCall: HttpCallService) {
    this.httpCall.getAllEvents('getAllEvents').subscribe((res: Event[]) => {
      this.eventsArrayList = res;
    });
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

