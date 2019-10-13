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
import { ReduxService } from 'src/app/services/redux-service.service';
import { ReduxVariables } from 'src/app/models/redux';
import { eAction } from 'src/app/services/redux/reducer';
import { StateService } from 'src/app/services/state.service';
import { ProxyBaseComponent } from '../proxy-base.component';
import { Page } from '../entity/page';

export interface Section {
  name: string;
  updated: Date;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent extends ProxyBaseComponent implements OnInit {
  taskArrayList: Tasks[];
  protected readonly tab = Page.task;
  noteArrayList: Notes[];
  sortTaskArrayList: Tasks[];
  sortNoteArrayList: Notes[];
  newEntityRedux: any;
  newEntity: EventEmitter<EntityBase> = new EventEmitter<EntityBase>();

  constructor(private httpCall: HttpCallService,
    private taskService: TaskService,
    stateService: StateService,
    private dialog: MatDialog,
    private redux: ReduxService) {
    super(httpCall, stateService);
    this.httpCall.getAllEvents('getAllTasks').subscribe((res: Tasks[]) => {
      this.taskArrayList = res;
    });

    this.httpCall.getAllEvents('getAllNotes').subscribe((res: Notes[]) => {
      this.noteArrayList = res;
    });
  }

  ngOnInit() {
    this.initialize();
    // We heart the task service to push in the array
    const value = this.redux.getValue(ReduxVariables.event);
    this.redux.getObservableValue().subscribe((reduxEntityValue: any) => {
      this.newEntityRedux = reduxEntityValue;
      const isTask = (reduxEntityValue.value.entity === Entity.Task);
      switch (reduxEntityValue.value.accion) {
        case (Accion.Save): {
          (isTask) ? this.taskArrayList.push(reduxEntityValue.value) : this.noteArrayList.push(reduxEntityValue.value);
          break;
        }
        case (Accion.Update): {
          (isTask) ? this.sortTaskArrayList = this.taskArrayList : this.sortNoteArrayList = this.noteArrayList;
          this.SortEntityArray(Accion.Update);
          break;
        }
        case (Accion.Delete): {
          (isTask) ? this.sortTaskArrayList = this.taskArrayList : this.sortNoteArrayList = this.noteArrayList;
          this.SortEntityArray(Accion.Delete);
          break;
        }
      }
    });
  }

  private SortEntityArray(accion: string) {
    let id = this.newEntityRedux.value.id;
    if (this.sortTaskArrayList !== undefined) {
      const entityToReplace = this.sortTaskArrayList.find(x => x.id === id);
      const startValue = this.sortTaskArrayList.indexOf(entityToReplace);
      ModelUtils.SortArray(this.sortTaskArrayList, startValue, 1, this.newEntityRedux.value, accion);
    } else {
      const entityToReplace = this.sortNoteArrayList.find(x => x.id === id);
      const startValue = this.sortNoteArrayList.indexOf(entityToReplace);
      ModelUtils.SortArray(this.sortNoteArrayList, startValue, 1, this.newEntityRedux.value, accion);
    }
  }

  EditEntity(entityToEdit: EntityBase) {
    const dialogRef = this.dialog.open(EditPopupTaskComponent, {
      width: '500px',
      data: entityToEdit,
    });

    dialogRef.componentInstance.closeEditPopUp.subscribe(() => {
      this.dialog.closeAll();
    });

    // dialogRef.componentInstance.EntitytoSend.subscribe((entity: EntityBaseRequest) => {
    //   // tslint:disable-next-line: max-line-length
    //   (entity.entity === Entity.Task) ? this.sortTaskArrayList = this.taskArrayList : this.sortNoteArrayList = this.noteArrayList;
    //   this.SortEntityArray(Accion.Update);
    // });
  }

  DeleteEntity(entityToDelete: EntityBase) {
    const dialogRef = this.dialog.open(DeletePopupTaskComponent, {
      width: '500px',
      data: entityToDelete,
    });

    dialogRef.componentInstance.closeDeletePopUp.subscribe(() => {
      this.dialog.closeAll();
    });

    // dialogRef.componentInstance.EntitytoSend.subscribe((entity: EntityBase) => {
    //   (entity.entity === Entity.Task) ? this.sortTaskArrayList = this.taskArrayList : this.sortNoteArrayList = this.noteArrayList;
    //   this.SortEntityArray(Accion.Delete);
    // });
  }

}
