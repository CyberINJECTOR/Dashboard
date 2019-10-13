import { Component, OnInit, Inject, EventEmitter } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { EntityToInsert } from 'src/app/page-components/home/Entities/Entity-insert-model';
import { TaskService } from 'src/app/services/task.service';
import { Tasks } from 'src/app/page-components/home/Entities/Task-model';
import { HttpCallService } from 'src/app/services/http-call.service';
import { EntityBase } from 'src/app/page-components/home/Entities/Entity-base';
import { Accion } from 'src/app/page-components/home/Entities/Accion-enum';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { ReduxService } from 'src/app/services/redux-service.service';
import { ReduxVariables } from 'src/app/models/redux';

@Component({
  selector: 'app-edit-popup-task',
  templateUrl: './edit-popup-task.component.html',
  styleUrls: ['./edit-popup-task.component.scss']
})
export class EditPopupTaskComponent implements OnInit {

  checkedTask: boolean;
  checkedNote: boolean;
  newEntityToEdit: EntityBase;
  newEntityToSave: EntityBase;
  textArea: string;
  closeEditPopUp: EventEmitter<boolean> = new EventEmitter<boolean>();
  EntitytoSend: EventEmitter<EntityBase> = new EventEmitter<EntityBase>();
  showErrorMessage: boolean;

  constructor(@Inject(MAT_DIALOG_DATA) public entityToEdit: EntityBase,
    private taskService: TaskService,
    private http: HttpCallService,
    private redux: ReduxService) {
  }

  ngOnInit() {
    this.newEntityToEdit = this.entityToEdit;
    const entityToUpdate = new EntityToInsert(this.newEntityToEdit);
    // Set the text input with the current value
    this.textArea = entityToUpdate.value;
    // Set the default textbox selected
    this.setCheckboxSelected(entityToUpdate, this.newEntityToEdit.entity);
  }

  private setCheckboxSelected(entityToUpdate: EntityToInsert, valueToSetCheckbox: string) {
    const entity = entityToUpdate.getEntity(valueToSetCheckbox);
    if (entity === 'Task') {
      this.checkedTask = true;
      this.checkedNote = false;
    } else {
      this.checkedTask = false;
      this.checkedNote = true;
    }
  }

  EditEntity(newEntityToUpdate: EntityBase) {
    // tslint:disable-next-line: no-conditional-assignment
    if (this.textArea !== '') {
      this.newEntityToSave = this.newEntityToEdit;
      this.newEntityToSave.value = this.textArea;
      newEntityToUpdate.accion = Accion.Update;
      this.http.update('update' + newEntityToUpdate.entity, newEntityToUpdate);
      this.taskService.UpdateTaskOrNote(this.newEntityToSave);
      this.redux.addItemToStoreRedux(ReduxVariables.event, this.newEntityToSave);
      this.closeEditPopUp.emit(true);
      // this.EntitytoSend.emit(this.newEntityToSave);
    } else {
      this.showErrorMessage = true;
    }

  }

  ClosePopUp() {
    this.closeEditPopUp.emit(true);
  }

}
