import { ILote } from './lote.interface';
import { IResponsable } from './responsable.interface';
import { Document } from 'mongoose';

export interface IArticulo extends Document {
	id: string;
	codigoBarra: string;
	descripcion: string;
  lote: ILote;
  activo: boolean;
	responsable: IResponsable;
	fechaCreacion: Date;
	fechaModificacion: Date;
}
