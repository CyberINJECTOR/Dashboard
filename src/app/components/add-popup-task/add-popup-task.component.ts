import { Component, OnInit, EventEmitter } from '@angular/core';
import { HttpCallService } from 'src/app/services/http-call.service';
import { TaskService } from 'src/app/services/task.service';
import { ModelUtils } from 'src/app/models/Model-utils';
import { EntityBase } from 'src/app/page-components/home/Entities/Entity-base';
import { EntityBaseRequest } from 'src/app/page-components/home/Entities/EntityBaseRequest';

@Component({
  selector: 'app-add-popup-task',
  templateUrl: './add-popup-task.component.html',
  styleUrls: ['./add-popup-task.component.scss']
})
export class AddPopupTaskComponent implements OnInit {
  closeAddPopUp: EventEmitter<boolean> = new EventEmitter<boolean>();
  newEntitySaved: EventEmitter<EntityBaseRequest> = new EventEmitter<EntityBaseRequest>();
  selectedValue: string;
  public textArea: string;

  constructor(private httpService: HttpCallService, private taskService: TaskService) { }

  ngOnInit() {
  }

  selectvalue(value: string) {
    this.selectedValue = (value === 'Task' ? 'Task' : 'Note');
  }

  AddEntity(selectedValue: string) {
    const request = new EntityBaseRequest();
    request.entity = selectedValue;
    request.value = this.textArea;
    request.accion = 'Save';
    request.created_ad = ModelUtils.ConvertActualDate(Date());
    request.updated_ad = ModelUtils.ConvertActualDate(Date());

    this.httpService.insert('insert' + request.entity, request);
    this.taskService.addTaskOrNote(request);
    this.newEntitySaved.emit(request);
    this.closeAddPopUp.emit(true);
  }

  ClosePopUp() {
    this.closeAddPopUp.emit(true);
  }
}
