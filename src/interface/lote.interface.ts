import { Document} from 'mongoose';
export interface ILote extends Document{
    identificador: string;
    fechaVencimiento: Date;
  }
  