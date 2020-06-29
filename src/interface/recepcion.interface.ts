import { InformacionDocumento } from './informacion-documento.interface';
import { IArticulo } from './articulo.interface';
import { Origen } from '../enums/origen.enum';
import { IResponsable } from './responsable.interface';
import { Document } from 'mongoose';

export interface IRecepcion extends Document {
	id: string;
	fechaIngreso: Date;
	folio: string;
	informacionDocumento: InformacionDocumento;
	articulos: Array<IArticulo>;
	origen: Origen;
	responsable: IResponsable;
	fechaTermino: Date;
}
