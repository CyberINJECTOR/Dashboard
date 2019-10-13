import { IMMDState, eAction } from './reducer';
export const ADD_ITEM = 'ADD_ITEM';
export const MODIFY_ITEM = 'MODIFY_ITEM';
export const DELETE_ITEM = 'DELETE_ITEM';

export const addItem = (item: IMMDState) => {
    return {
        type: eAction.ADD_ITEM,
        label: item.label,
        value: item.value
    };
};


export const modifyItem = (item: IMMDState) => {
    return {
        type: eAction.MODIFY_ITEM,
        label: item.label,
        value: item.value
    };
};

export const deleteItem = (value: any) => {
    return {
        type: eAction.DELETE_ITEM,
        // tslint:disable-next-line: object-literal-shorthand
        value: value,
    };
};
