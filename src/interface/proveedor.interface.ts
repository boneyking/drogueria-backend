import { IInformacionContacto } from "./informacion-contacto.interface";
import { IResponsable } from "./responsable.interface";

export interface IProveedor {
    id?: string;
    nombre: string;
    rut: number;
    contactos: Array<IInformacionContacto>;
    responsable: IResponsable;
    fechaCreacion: Date;
    fechaModificacion: Date;
  }