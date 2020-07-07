import { ILote } from './lote.interface';
import { IResponsable } from './responsable.interface';
import { Document } from 'mongoose';
import { IArsenal } from './arsenal.interface';

export interface IArticulo extends Document {
	id: string;
	codigoBarra: string;
	arsenal: IArsenal;
	lote: Array<ILote>;
	activo: boolean;
	responsable: IResponsable;
	fechaCreacion: Date;
	fechaModificacion: Date;
}
