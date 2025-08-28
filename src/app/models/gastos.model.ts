import{Rubros} from '../models/rubros.model'
export interface Gastos {
    id:          number;
    concepto: string;
    fecha: Date;
    monto: number;
    rubroId:number;
    rubro?:Rubros;
    createdAt:   Date;
    updatedAt:   Date;
}








