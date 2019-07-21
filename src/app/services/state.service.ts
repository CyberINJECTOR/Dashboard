import { Injectable } from '@angular/core';
import { Route, ActivatedRoute, ParamMap, Router, Params, RoutesRecognized } from '@angular/router';
import { Observable, of } from 'rxjs';
import { localStorageVariables } from '../models/local-storage';
import { ModelUtils } from '../models/Model-utils';
import { EventEmitter } from '@angular/core';
import { filter, map } from 'rxjs/operators';

export interface IStateEvent {
  key: string;
  value: string;
}

@Injectable()
export class StateService {
  private itemSetEvent: EventEmitter<any> = new EventEmitter<any>();

  constructor(private route: Router, private router: ActivatedRoute) {

  }

  public initializeLocalStorage() {
    this.route.events.subscribe(val => {
      if (val instanceof RoutesRecognized) {
        const selectedTab = val.state.url;
        const formatChange = ModelUtils.DeleteCharacter(selectedTab, 1);
        const selectedTabToStore = ModelUtils.ConvertToUpperCase(formatChange);
        this.addItem(localStorageVariables.selectedTab, selectedTabToStore);
      }
    });
  }

  public addItem(key: string, value: string) {
    localStorage.setItem(key, value);
    this.itemSetEvent.emit( { id: key, description: value });
  }

  public deleteItem(key: string) {
    localStorage.removeItem(key);
  }

  public getItem<T>(key: string) {
    return localStorage.getItem(key);
  }

  public getObservableItem<T>(key: string): Observable<T> {
    return this.itemSetEvent.asObservable().pipe(
      filter((label: IStateEvent) => label.value === key),
      map((label: IStateEvent) => label.key as unknown as T)
    );
  }
}
