import { Injectable, EventEmitter } from '@angular/core';
import { Route, ActivatedRoute, ParamMap, Router, Params, RoutesRecognized } from '@angular/router';
import { Observable, of, Subject, BehaviorSubject } from 'rxjs';
import { logger } from 'redux-logger';
import { ModelUtils } from '../models/Model-utils';
import { filter, map, switchMap, reduce } from 'rxjs/operators';
import { StateEntity } from './Entities/StateEntity';
import { IStateEvent, IMMDState, AppState, eAction, reducer, initialState } from './redux/reducer';
import { Store, createStore, applyMiddleware } from 'redux';
import { modifyItem, addItem, deleteItem } from './redux/action';
import { ReduxVariables } from '../models/redux';
import { composeWithDevTools } from 'redux-devtools-extension';

@Injectable()
export class StateService {
  private itemSetEvent: EventEmitter<IStateEvent> = new EventEmitter<IStateEvent>();
  private store: Store<AppState>
  stateEntity: StateEntity = null;
  constructor(private route: Router, private router: ActivatedRoute) {
    this.store = createStore<AppState>(reducer, initialState, composeWithDevTools(applyMiddleware(logger)));
  };


  public initializeLocalStorage(tab: string) {
    const selectedTab = tab;
    const formatChange = ModelUtils.DeleteCharacter(selectedTab, 1);
    const selectedTabToStore = ModelUtils.ConvertToUpperCase(formatChange);
    this.addItem(ReduxVariables.selectedTab, tab);
  }

  public addItem(label: string, value: any) {
    const store = (value === 'Task_and_Notes') ? 'Task & Notes' : value;

    if (this.getItem(label)) {
      this.store.dispatch(modifyItem({ label: label, value: value }));
      this.itemSetEvent.emit({ label: label, value: store, type: eAction.MODIFY_ITEM });
    } else {
      this.store.dispatch(addItem({ label: label, value: value }));
      this.itemSetEvent.emit({ label: label, value: store, type: eAction.ADD_ITEM });
    }
  }


  public deleteItem(label: string) {
    this.store.dispatch(deleteItem(label));
    this.itemSetEvent.emit({ type: eAction.DELETE_ITEM, label: label });
  }

  get Items(): IMMDState[] {
    return this.store ? this.store.getState().items : [];
  }

  private getItem(label: string) {
    return this.Items.find((item: IMMDState) => item.label.toLocaleLowerCase() === label.toLocaleLowerCase());
  }

  getValue<T>(label: string): T {
    const itemFound = this.getItem(label);

    return itemFound ? itemFound.value as T : undefined;
  }

  public getObservableValue<T>(label: string): Observable<T> {
    return this.itemSetEvent.asObservable().pipe(
      filter((event: IStateEvent) =>
        event.label === label),
      map((event: IStateEvent) =>
        event.value as T)
    );
  }

  private getObs(key: any): Observable<any> {
    return (key) ? of(key.value) : of();
  }
}
