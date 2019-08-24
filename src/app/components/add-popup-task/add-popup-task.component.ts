import { Component, OnInit, EventEmitter } from '@angular/core';
import { HttpCallService } from 'src/app/services/http-call.service';
import { TaskService } from 'src/app/services/task.service';
import { ModelUtils } from 'src/app/models/Model-utils';
import { EntityBase } from 'src/app/page-components/home/Entities/Entity-base';
import { EntityBaseRequest } from 'src/app/page-components/home/Entities/EntityBaseRequest';
import { Accion } from 'src/app/page-components/home/Entities/Accion-enum';
import { Entity } from 'src/app/page-components/home/Entities/Entity-enum';

@Component({
  selector: 'app-add-popup-task',
  templateUrl: './add-popup-task.component.html',
  styleUrls: ['./add-popup-task.component.scss']
})
export class AddPopupTaskComponent implements OnInit {
  closeAddPopUp: EventEmitter<boolean> = new EventEmitter<boolean>();
  newEntitySaved: EventEmitter<EntityBaseRequest> = new EventEmitter<EntityBaseRequest>();
  selectedValue: string = Entity.Task;
  public textArea: string;
  showErrorMessage: boolean;
  showCheckboxError: boolean;
  labelPosition = 'after';
  task: boolean;
  note: boolean;
  constructor(private httpService: HttpCallService, private taskService: TaskService) { }

  ngOnInit() {
  }

  selectvalue(value: string) {
    this.selectedValue = (value === 'Task' ? 'Task' : 'Note');
  }

  AddEntity(selectedValue: string) {

    if (this.textArea !== undefined && this.selectedValue !== undefined ) {
      const request = new EntityBaseRequest();
      request.entity = selectedValue;
      request.value = this.textArea;
      request.accion = Accion.Save;
      request.created_ad = ModelUtils.ConvertActualDate(Date());
      request.updated_ad = ModelUtils.ConvertActualDate(Date());

      this.httpService.insert('insert' + request.entity, request);
      this.taskService.addTaskOrNote(request);
      this.newEntitySaved.emit(request);
      this.closeAddPopUp.emit(true);
      this.showErrorMessage = true;
      this.showCheckboxError = true;
    } else if (this.textArea === undefined && this.selectedValue === undefined) {
      this.showErrorMessage = true;
      this.showCheckboxError = true;
    } else if (this.textArea === undefined) {
      this.showErrorMessage = true;
      this.showCheckboxError = false;
    } else if (this.selectedValue === undefined) {
      this.showCheckboxError = true;
      this.showErrorMessage = false;
    }
  }

  ClosePopUp() {
    this.closeAddPopUp.emit(true);
  }
}
