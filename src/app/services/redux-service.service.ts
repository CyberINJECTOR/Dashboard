import { Injectable } from '@angular/core';
import { Store, createStore, applyMiddleware } from 'redux';
import { reducer, initialState, AppState, IMMDState } from './redux/reducer';
import { ADD_ITEM, addItem, deleteItem, modifyItem, MODIFY_ITEM, DELETE_ITEM } from './redux/action';
import { logger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Observable, of, Subject, BehaviorSubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';


@Injectable()
export class ReduxService {
  private store: Store<AppState>;
  private reduxState: Subject<any> = new BehaviorSubject<any>(null);

  get Items(): IMMDState[] {
    return this.store ? this.store.getState().items : [];
  }
  constructor() {
    this.store = createStore<AppState>(reducer, initialState, composeWithDevTools(applyMiddleware(logger)));
  }

  addItemToStoreRedux(label: string, value: any) {
    if (this.getItem(label)) {
      // tslint:disable-next-line: object-literal-shorthand
      this.store.dispatch(modifyItem({ label: label, value: value }));
      // tslint:disable-next-line: object-literal-shorthand
      this.reduxState.next({ label: label, value: value, eAction: MODIFY_ITEM });
    } else {
      // tslint:disable-next-line: object-literal-shorthand
      this.store.dispatch(addItem({ label: label, value: value }));
      // tslint:disable-next-line: object-literal-shorthand
      this.reduxState.next({ label: label, value: value, eAction: ADD_ITEM });
    }

  }

  deleteItemToStoreRedux(value: any) {
    this.store.dispatch(deleteItem(value));
    // tslint:disable-next-line: object-literal-shorthand
    this.reduxState.next({ value: value, eAction: DELETE_ITEM });
  }

  private getItem(label: string) {
    return this.Items.find((item: IMMDState) => item.label.toLocaleLowerCase() === label.toLocaleLowerCase());
  }

  getValue<T>(label: string): T {
    const itemFound = this.getItem(label);
    return itemFound ? itemFound.value : Text;
  }

  public getObservableValue(): Observable<any> {
    return this.reduxState.asObservable().pipe(
      switchMap((reduxState: any) => this.getObs(reduxState))
    );
  }

  private getObs(key: any): Observable<any> {
    return (key) ? of(key) : of();
  }
}
