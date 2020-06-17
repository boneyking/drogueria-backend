import { ILote } from "./lote.interface";
import { IResponsable } from "./responsable.interface";
import { Document} from 'mongoose';

export interface IArticulo extends Document{
  codigoBarra: string;
  nombre: string;
  descripcion: string;
  cantidad?: number;
  lote?: ILote;
  responsable: IResponsable;
  activo: boolean;
  fechaCreacion: Date;
  fechaModificacion: Date;
}
