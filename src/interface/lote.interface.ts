import { Document} from 'mongoose';
export interface ILote extends Document{
    identificador: string;
    fechaVencimiento: Date;
    valorUnitario: number;
    cantidadEntrada: number;
    cantidadSalida: number;
    stock: number;
  }
  