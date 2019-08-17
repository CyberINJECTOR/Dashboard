import { Component, OnInit, EventEmitter, Inject } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { HttpCallService } from 'src/app/services/http-call.service';
import { EntityBase } from 'src/app/page-components/home/Entities/Entity-base';
import { MAT_DIALOG_DATA } from '@angular/material';


@Component({
  selector: 'app-delete-popup-task',
  templateUrl: './delete-popup-task.component.html',
  styleUrls: ['./delete-popup-task.component.scss']
})
export class DeletePopupTaskComponent implements OnInit {

  newEntityToDelete: EntityBase;
  closeDeletePopUp: EventEmitter<boolean> = new EventEmitter<boolean>();
  EntitytoSend: EventEmitter<EntityBase> = new EventEmitter<EntityBase>();

  constructor(@Inject(MAT_DIALOG_DATA) public entityToEdit: EntityBase,
              private taskService: TaskService,
              private http: HttpCallService) { }

  ngOnInit() {
    this.taskService.getObservableValue().subscribe((entityUpdated: EntityBase) => {
      this.newEntityToDelete = entityUpdated;
      // this.newEntityToEdit = entityUpdated;
      console.log(entityUpdated + ' Entity Updated from Behavior Subject ');
    });
  }

  DeleteEntity(entityToDelete: EntityBase) {
    this.http.delete('delete' + entityToDelete.entity, entityToDelete);
    this.taskService.DeleteTaskOrNote(entityToDelete);
    this.closeDeletePopUp.emit(true);
    this.EntitytoSend.emit(entityToDelete);
  }

}
