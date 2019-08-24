import { Component, OnInit, EventEmitter } from '@angular/core';
import { HttpCallService } from 'src/app/services/http-call.service';
import { Tasks } from './Entities/Task-model';
import { Notes } from './Entities/Notes-model';
import { TaskService } from 'src/app/services/task.service';
import { MatDialog } from '@angular/material';
import { EditPopupTaskComponent } from 'src/app/components/edit-popup-task/edit-popup-task.component';
import { DeletePopupTaskComponent } from 'src/app/components/delete-popup-task/delete-popup-task.component';
import { EntityBase } from './Entities/Entity-base';
import { Accion } from './Entities/Accion-enum';
import { Entity } from './Entities/Entity-enum';
import { EntityBaseRequest } from './Entities/EntityBaseRequest';
import { ModelUtils } from 'src/app/models/Model-utils';

export interface Section {
  name: string;
  updated: Date;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  taskArrayList: Tasks[];
  noteArrayList: Notes[];
  sortTaskArrayList: Tasks[];
  sortNoteArrayList: Notes[];
  newEntityToSave: EntityBase;
  newEntity: EventEmitter<EntityBase> = new EventEmitter<EntityBase>();

  constructor(private httpCall: HttpCallService, private taskService: TaskService, private dialog: MatDialog) {
    this.httpCall.getAllEvents('getAllTasks').subscribe((res: Tasks[]) => {
      this.taskArrayList = res;
    });

    this.httpCall.getAllEvents('getAllNotes').subscribe((res: Notes[]) => {
      this.noteArrayList = res;
    });
  }

  ngOnInit() {
    // We heart the task service to push in the array
    this.taskService.getObservableValue().subscribe((entitySaved: EntityBase) => {
      this.newEntityToSave = entitySaved;

      if (this.newEntityToSave.accion === Accion.Save) {
        (entitySaved.entity === Entity.Task) ? this.taskArrayList.push(entitySaved) : this.noteArrayList.push(entitySaved);
        console.log(entitySaved + ' Entity saved from Behavior Subject ');
      }
    });
  }

  EditEntity(entityToEdit: EntityBase) {
    const dialogRef = this.dialog.open(EditPopupTaskComponent, {
      width: '500px',
      data: entityToEdit,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });

    dialogRef.componentInstance.closeEditPopUp.subscribe(() => {
      this.dialog.closeAll();
    });

    dialogRef.componentInstance.EntitytoSend.subscribe((entity: EntityBaseRequest) => {
      // tslint:disable-next-line: max-line-length
      (entity.entity === Entity.Task) ? this.sortTaskArrayList = this.taskArrayList : this.sortNoteArrayList = this.noteArrayList;
      this.SortEntityArray(Accion.Update);
    });
  }

  DeleteEntity(entityToDelete: EntityBase) {
    const dialogRef = this.dialog.open(DeletePopupTaskComponent, {
      width: '500px',
      data: entityToDelete,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });

    dialogRef.componentInstance.closeDeletePopUp.subscribe(() => {
      this.dialog.closeAll();
    });

    dialogRef.componentInstance.EntitytoSend.subscribe((entity: EntityBase) => {
      (entity.entity === Entity.Task) ? this.sortTaskArrayList = this.taskArrayList : this.sortNoteArrayList = this.noteArrayList;
      this.SortEntityArray(Accion.Delete);
    });
  }

  private SortEntityArray(accion: string) {
    if (this.sortTaskArrayList !== undefined) {
      const entityToReplace = this.sortTaskArrayList.find(x => x.id === this.newEntityToSave.id);
      const startValue = this.sortTaskArrayList.indexOf(entityToReplace);
      ModelUtils.SortArray(this.sortTaskArrayList, startValue, 1, this.newEntityToSave, accion);
    } else {
      const entityToReplace = this.sortNoteArrayList.find(x => x.id === this.newEntityToSave.id);
      const startValue = this.sortNoteArrayList.indexOf(entityToReplace);
      ModelUtils.SortArray(this.sortNoteArrayList, startValue, 1, this.newEntityToSave, accion);
    }
  }
}
