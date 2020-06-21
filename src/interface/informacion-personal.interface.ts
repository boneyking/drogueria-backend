import { IInformacionContacto } from "./informacion-contacto.interface";

export interface IInformacionPersonal{
    id: string;
    nombres: String;
    apellidos: String;
    informacionContacto: IInformacionContacto;
    cargo: String;
}