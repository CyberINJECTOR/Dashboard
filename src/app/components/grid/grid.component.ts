import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { EventColums } from 'src/app/models/event-colums';
import { HttpCallService } from 'src/app/services/http-call.service';
import { Image } from '../../page-components/imagen/image-model';
import { trigger, style, state, transition, animate } from '@angular/animations';
import { StateService } from 'src/app/services/state.service';
import { ReduxVariables } from 'src/app/models/redux';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class GridComponent implements OnInit {
  displayedColumns = ['id', 'img_url', 'description', 'id_EventType', 'created_ad', 'edit', 'delete'];
  titles = ['id', 'description', 'img_url', 'id_EventType', 'created_ad', 'updated_ad'];
  eventColumns: EventColums;
  expandedElement: any | null;
  arrayList: Image[];
  @Input() entity: string;
  @ViewChild('firstMessage', { static: false, }) firstMessage: ElementRef;

  id: number;
  description: string;
  img_url: string;
  id_EventType: string;
  urlImg: string;
  created_ad: string;
  updated_ad: string;

  constructor(private http: HttpCallService, private stateService: StateService, private formBuilder: FormBuilder, ) {

  }

  ngOnInit() {
    console.log(this.firstMessage);
    // this.buildForm(this.entity);
    this.stateService.getObservableValue<number>(ReduxVariables.eventId).subscribe(eventId => {
      this.http.getAllImageByEventId('getImageArrayListById', eventId).subscribe(result => {
        this.arrayList = result;
      });
    });

    if (this.entity === 'Event') {
      this.http.getAllEvents('getAllEvents').subscribe(result => {
        this.arrayList = result;
      });
    }
  }

  // updateEntity(entity: any) {
  //   console.log(entity);
  // }

  // private buildForm(entity: any) {
  //   if (entity === 'Event') {
  //     this.formGroup = this.formBuilder.group({
  //       id: entity.id,
  //       description: entity.description,
  //       img_url: entity.img_url,
  //       id_EventType: entity.id_EventType,
  //       created_ad: entity.created_ad,
  //       updated_ad: entity.updated_ad
  //     });
  //   } else {
  //     this.formGroup = this.formBuilder.group({
  //       id: entity.id,
  //       description: entity.description,
  //       img_url: entity.img_url,
  //       created_ad: entity.created_ad,
  //       updated_ad: entity.updated_ad
  //     });
  //   }
  // }

}
