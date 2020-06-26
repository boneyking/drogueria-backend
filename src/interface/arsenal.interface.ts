import { Document } from 'mongoose';
import { IResponsable } from './responsable.interface';

export interface IArsenal extends Document {
	id: string;
	nombre: string;
	arsenalTipo: ArsenalTipo;
	responsable: IResponsable;
	fechaCreacion: Date;
	fechaModificacion: Date;
}

export enum ArsenalTipo {
	Medicamento = 'Medicamento',
	Insumo = 'Insumo',
	AyudaTecnica = 'Ayuda Técnica',
}
