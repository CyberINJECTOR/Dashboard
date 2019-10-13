import { AppState } from './reducer';
import { combineReducers, Reducer } from 'redux';

export interface AppState {
    items: IMMDState[];
}
export interface IMMDState {
    label: string;
    value?: any;
}

export interface IStateEvent extends IMMDState {
    type: eAction;
}

export enum eAction {
    ADD_ITEM = 'ADD_ITEM',
    MODIFY_ITEM = 'MODIFY_ITEM',
    DELETE_ITEM = 'DELETE_ITEM'
}

export interface Action {
    type: string;
    value?: any;
}

export const initialState = {
    items: Array<IMMDState>()
};

export const items = (state: IMMDState[] = [], action: IStateEvent) => {
    switch (action.type) {
        case eAction.ADD_ITEM:
            return [...state, { label: action.label, value: action.value }];
        case eAction.MODIFY_ITEM:
            return state.map((item: IMMDState) => (item.label === action.label) ? { ...item, value: action.value } : item);
        case eAction.DELETE_ITEM:
            return state.filter((item: IMMDState) => item.label !== action.label);
        default:
            return state;
    }
};

export const reducer: Reducer<AppState> = combineReducers({ items });
