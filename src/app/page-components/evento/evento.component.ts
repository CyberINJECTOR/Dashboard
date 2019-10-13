import { Component, OnInit } from '@angular/core';
import { HttpCallService } from 'src/app/services/http-call.service';
import { Event } from '../../page-components/evento/event';
import { EventColums } from '../../models/event-colums';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { StateService } from 'src/app/services/state.service';
import { ProxyBaseComponent } from '../proxy-base.component';
import { Page } from '../entity/page';

@Component({
  selector: 'app-evento',
  templateUrl: './evento.component.html',
  styleUrls: ['./evento.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class EventoComponent extends ProxyBaseComponent implements OnInit {
  displayedColumns = ['id', 'img_url', 'description', 'id_EventType', 'created_ad', 'edit', 'delete'];
  titles = ['id', 'description', 'img_url', 'id_EventType', 'created_ad', 'updated_ad'];
  eventsArrayList: Event[];
  eventColumns: EventColums;
  expandedElement: Event | null;
  protected readonly tab = Page.event;
  // public formGroup: FormGroup;
  constructor(private httpCall: HttpCallService, stateService: StateService) {
    super(httpCall, stateService);
    this.httpCall.getAllEvents('getAllEvents').subscribe((res: Event[]) => {
      this.eventsArrayList = res;
    });
  }



  ngOnInit() {
    this.initialize();
  }

}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

