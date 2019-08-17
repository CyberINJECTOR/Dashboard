import { Component, OnInit, Inject, EventEmitter } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { EntityToInsert } from 'src/app/page-components/home/Entities/Entity-insert-model';
import { TaskService } from 'src/app/services/task.service';
import { Tasks } from 'src/app/page-components/home/Entities/Task-model';
import { HttpCallService } from 'src/app/services/http-call.service';
import { EntityBase } from 'src/app/page-components/home/Entities/Entity-base';
import { Accion } from 'src/app/page-components/home/Entities/Accion-enum';

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

  constructor(@Inject(MAT_DIALOG_DATA) public entityToEdit: EntityBase,
              private taskService: TaskService,
              private http: HttpCallService) {

  }

  ngOnInit() {
    // Get the task to update
    this.taskService.getObservableValue().subscribe((entityUpdated: EntityBase) => {
      this.newEntityToEdit = entityUpdated;
      console.log(entityUpdated + ' Entity Updated from Behavior Subject ');
    });
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
    this.newEntityToSave = this.newEntityToEdit;
    this.newEntityToSave.value = this.textArea;
    newEntityToUpdate.accion = Accion.Update;
    this.http.update('update' + newEntityToUpdate.entity, newEntityToUpdate);
    this.taskService.UpdateTaskOrNote(this.newEntityToSave);
    this.closeEditPopUp.emit(true);
    this.EntitytoSend.emit(this.newEntityToSave);
  }

  ClosePopUp() {
    this.closeEditPopUp.emit(true);
  }

}
