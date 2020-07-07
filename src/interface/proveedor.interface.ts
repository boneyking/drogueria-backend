import { IInformacionContacto } from "./informacion-contacto.interface";
import { IResponsable } from "./responsable.interface";
import { Document } from 'mongoose';

export interface IProveedor extends Document {
    nombre: string;
    rut: string;
    contactos: Array<IInformacionContacto>;
    responsable: IResponsable;
    fechaCreacion: Date;
    fechaModificacion: Date;
  }