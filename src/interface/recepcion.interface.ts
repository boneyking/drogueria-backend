import { IProveedor } from "./proveedor.interface";
import { TipoDocumento } from "../enums/tipo-documento.enum";
import { TipoOrigen } from "../enums/tipo-origin.enum";
import { IArticulo } from "./articulo.interface";

export interface IRecepcion {
    id: string;
    folio: number;
    proveedor: IProveedor;
    tipoDocumento: TipoDocumento;
    numeroDocumento: number;
    origen: TipoOrigen;
    fechaRecepcion: Date;
    articulos: Array<IArticulo>;
  }
  