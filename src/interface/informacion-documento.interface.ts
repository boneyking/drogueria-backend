import { IProveedor } from "./proveedor.interface";
import { TipoDocumento } from "../enums/tipo-documento.enum";

export interface InformacionDocumento{
	proveedor: IProveedor;
	documentoTipo: TipoDocumento;
	identificadorDocumento: string;
}