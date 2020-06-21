import { Document } from "mongoose";
import { Roles } from "../enums/roles.enum";
import { IInformacionPersonal } from "./informacion-personal.interface";

export interface IUsuario extends Document {
    rut: string;
    password: string;
    roles: Array<Roles>;
    informacionPersonal: IInformacionPersonal;
    compararPassword: (password: string) => Promise<Boolean>
  };