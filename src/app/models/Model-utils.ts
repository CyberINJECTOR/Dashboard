import { Accion } from '../page-components/home/Entities/Accion-enum';

// type NewType = T;

export class ModelUtils {
    public static DeleteCharacter(chain: string, position: number): string {
        return chain.substring(position);
    }

    public static ConvertToUpperCase(chain: string): string {
        return chain.charAt(0).toUpperCase() + chain.slice(1);
    }

    // Sun Aug 11 2019 14:44:40 GMT-0300 (hora estándar de Argentina)
    public static ConvertActualDate(chainDate: string): string {
        const newDate = chainDate.substr(4, 11);
        return newDate;
    }

    public static SortArray(array: Array<any>, start: number, deleteAmt: number, entity: any, accion: string) {
        if  (accion === Accion.Update) {
            this.RemoveItemOnArray(array, start, deleteAmt);
            array.push(entity);
        } else {
            this.RemoveItemOnArray(array, start, deleteAmt);
        }
        // tslint:disable-next-line: only-arrow-functions
        array.sort(function(a, b) {
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

    public static RemoveItemOnArray(array: Array<any>, start: number, deleteAmt: number) {
        array.splice(start, deleteAmt);
    }

    public static AddItemInArray(array: []) {
    }

    public static FindItemInArray(array: []) {

    }
}
