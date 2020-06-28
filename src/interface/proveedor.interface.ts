import { IInformacionContacto } from "./informacion-contacto.interface";
import { IResponsable } from "./responsable.interface";
import { Document } from 'mongoose';

export interface IProveedor extends Document {
    id?: string;
    nombre: string;
    rut: number;
    contactos: Array<IInformacionContacto>;
    responsable: IResponsable;
    fechaCreacion: Date;
    fechaModificacion: Date;
  }