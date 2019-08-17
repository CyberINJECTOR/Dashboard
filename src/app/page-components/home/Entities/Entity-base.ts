import { Tasks } from './Task-model';
import { EntityBaseRequest } from './EntityBaseRequest';

export class EntityBase {
    public id: number;
    public entity: string;
    public value: string;
    public accion: string;
    // tslint:disable-next-line: variable-name
    public updated_ad: any;
    // tslint:disable-next-line: variable-name
    public created_ad: any;

    constructor(newEntity: EntityBaseRequest) {
        this.id = newEntity.id;
        this.entity = newEntity.entity;
        this.value = newEntity.value;
        this.accion = newEntity.accion;
        this.created_ad = newEntity.created_ad;
        this.updated_ad = newEntity.updated_ad;
    }

    Sort(arrayEntities: EntityBase[], entityToSort: EntityBase) {
        const entityToReplace = arrayEntities.find(x => x.id === entityToSort.id);
        const index = arrayEntities.indexOf(entityToReplace);
        arrayEntities.splice(index, 1);
        arrayEntities.push(entityToSort);
        // tslint:disable-next-line: only-arrow-functions
        arrayEntities.sort(function(a, b) {
            if (a.id > b.id) {
                return 1;
            }
            if (a.id < b.id) {
                return -1;
            }
            // a must be equal to b
            return 0;
        });
    }
}

export interface EntityBaseInterface {
    id: number;
    entity: string;
    value: string;
    accion: string;
    created_ad: string;
    updated_ad: string;
}
