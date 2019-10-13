import { Component, OnInit, EventEmitter, Inject } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { HttpCallService } from 'src/app/services/http-call.service';
import { EntityBase } from 'src/app/page-components/home/Entities/Entity-base';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Accion } from 'src/app/page-components/home/Entities/Accion-enum';
import { ReduxService } from 'src/app/services/redux-service.service';
import { ReduxVariables } from 'src/app/models/redux';


@Component({
  selector: 'app-delete-popup-task',
  templateUrl: './delete-popup-task.component.html',
  styleUrls: ['./delete-popup-task.component.scss']
})
export class DeletePopupTaskComponent implements OnInit {

  newEntityToDelete: EntityBase;
  closeDeletePopUp: EventEmitter<boolean> = new EventEmitter<boolean>();
  EntitytoSend: EventEmitter<EntityBase> = new EventEmitter<EntityBase>();

  constructor(@Inject(MAT_DIALOG_DATA) public entityToDelete: EntityBase,
              private taskService: TaskService,
              private http: HttpCallService,
              private redux: ReduxService) {
  }

  ngOnInit() {
    this.newEntityToDelete = this.entityToDelete;
  }

  DeleteEntity(entityToDelete: EntityBase) {
    entityToDelete.accion = Accion.Delete;
    this.http.delete('delete' + entityToDelete.entity, entityToDelete);
    this.taskService.DeleteTaskOrNote(entityToDelete);
    this.redux.deleteItemToStoreRedux(entityToDelete);
    this.closeDeletePopUp.emit(true);
    // this.EntitytoSend.emit(entityToDelete);
  }

  ClosePopUp() {
    this.closeDeletePopUp.emit(true);
  }
}
