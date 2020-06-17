import { Schema, model } from "mongoose";
import { IArticulo } from "../interface/articulo.interface";


const articuloSchema = new Schema({
  codigoBarra: String,
  nombre: String,
  descripcion: String,
  cantidad: Number,
  lote: {
    id: String,
    identificador: String,
    fechaVencimiento: Date
  },
  responsable: {
    usuarioId: String,
    nombre: String
  },
  activo: Boolean,
  fechaCreacion: Date,
  fechaModificacion: Date,
});

export default model<IArticulo>("Articulo", articuloSchema);
