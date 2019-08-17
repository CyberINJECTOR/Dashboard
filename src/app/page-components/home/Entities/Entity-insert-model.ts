import { EntityBase } from './Entity-base';

export class EntityToInsert {
    id: number;
    entity: string;
    value: string;
    accion: string;
    // tslint:disable-next-line: variable-name
    updated_ad: any;
    // tslint:disable-next-line: variable-name
    created_ad: any;

    constructor(entityToUpdate: EntityBase) {
        this.id = entityToUpdate.id;
        this.entity = entityToUpdate.entity;
        this.value = entityToUpdate.value;
        this.accion = entityToUpdate.accion;
        this.created_ad = entityToUpdate.created_ad;
        this.updated_ad = entityToUpdate.updated_ad;
    }

    getEntity(entity: string) {
        return entity;
    }
}


