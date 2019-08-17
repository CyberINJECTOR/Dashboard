import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject, Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { EntityBase, EntityBaseInterface } from '../page-components/home/Entities/Entity-base';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private Task: Subject<EntityBaseInterface> = new BehaviorSubject<EntityBaseInterface>(null);

  constructor() { }


  addTaskOrNote(entityToSave: EntityBaseInterface) {
    const num = Math.random();
    this.Task.next({
      id: num, entity: entityToSave.entity, value: entityToSave.value, accion: entityToSave.accion,
      updated_ad: entityToSave.updated_ad, created_ad: entityToSave.created_ad
    });
  }

  UpdateTaskOrNote(entityToSave: EntityBaseInterface) {
    this.Task.next({
      id: entityToSave.id, entity: entityToSave.entity, value: entityToSave.value, accion: entityToSave.accion,
      updated_ad: entityToSave.updated_ad, created_ad: entityToSave.created_ad
    });
  }

  DeleteTaskOrNote(entityToSave: EntityBaseInterface) {
    this.Task.next({
      id: entityToSave.id, entity: entityToSave.entity, value: entityToSave.value, accion: entityToSave.accion,
      updated_ad: entityToSave.updated_ad, created_ad: entityToSave.created_ad
    });
  }

  public getObservableValue(): Observable<EntityBaseInterface> {
    return this.Task.asObservable().pipe(
      switchMap((task: EntityBaseInterface) => this.getObs(task))
    );
  }

  private getObs(key: any): Observable<EntityBaseInterface> {
    return (key) ? of(key) : of();
  }

}
