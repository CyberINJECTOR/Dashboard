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
    localStorage.setItem(keyType, valueType);
    this.itemSetEvent.next({ key: keyType, value: valueType });
    // console.log(this.itemSetEvent);
  }

  public deleteItem(key: string) {
    localStorage.removeItem(key);
  }

  public getItem<T>(key: string) {
    return localStorage.getItem(key);
  }

  // public getObservableItems<T>(key: string): Observable<T> {
  //   return this.itemSetEvent.asObservable().pipe(
  //     filter((label: IStateEvent) => label.value === key),
  //     map((label: IStateEvent) => label.key as unknown as T)
  //   );
  // }


  public getObservableValue<T>(key: any): Observable<any> {
    return this.itemSetEvent.asObservable().pipe(
     switchMap((tab: any) => this.getObs(tab))
    );
  }

  private getObs(key: any): Observable<any> {
    return (key) ? of(key.value) : of();
  }
}
