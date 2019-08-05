import { Injectable } from '@angular/core';
import { Route, ActivatedRoute, ParamMap, Router, Params, RoutesRecognized } from '@angular/router';
import { Observable, of, Subject, BehaviorSubject } from 'rxjs';
import { LocalStorageVariables } from '../models/local-storage';
import { ModelUtils } from '../models/Model-utils';
import { filter, map, switchMap } from 'rxjs/operators';
import { StateEntity } from './Entities/StateEntity';

@Injectable()
export class StateService {
  private itemSetEvent: Subject<any> = new BehaviorSubject<any>(null);
  stateEntity: StateEntity = null;
  constructor(private route: Router, private router: ActivatedRoute) {

  }

  public initializeLocalStorage() {
    this.route.events.subscribe(val => {
      if (val instanceof RoutesRecognized) {
        const selectedTab = val.state.url;
        const formatChange = ModelUtils.DeleteCharacter(selectedTab, 1);
        const selectedTabToStore = ModelUtils.ConvertToUpperCase(formatChange);
        this.addItem(LocalStorageVariables.selectedTab, selectedTabToStore);
      }
    });
  }

  public addItem(keyType: string, valueType: string) {
    const store = (valueType === 'Task_and_Notes') ? 'Task & Notes' : valueType;
    localStorage.setItem(keyType, store);
    this.itemSetEvent.next({ key: keyType, value: store });
  }

  public deleteItem(key: string) {
    localStorage.removeItem(key);
  }

  public getItem<T>(key: string) {
    return localStorage.getItem(key);
  }

  public getObservableValue<T>(key: any): Observable<any> {
    return this.itemSetEvent.asObservable().pipe(
     switchMap((tab: any) => this.getObs(tab))
    );
  }

  private getObs(key: any): Observable<any> {
    return (key) ? of(key.value) : of();
  }
}
