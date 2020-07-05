import { Document } from 'mongoose';
import { IArticulo } from './articulo.interface';
import { TipoMovimiento } from '../enums/tipo-movimiento.enum';
import { IResponsable } from './responsable.interface';

export interface IMovimiento extends Document{
	id: string;
	articulo: IArticulo;
	stockActual: number;
	tipoMovimiento: TipoMovimiento;
	responsable: IResponsable;
	fecha: Date;
}
