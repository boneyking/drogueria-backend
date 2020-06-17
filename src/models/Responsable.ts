import { Schema, model } from "mongoose";
import { ILote } from "../interface/lote.interface";
import { IResponsable } from "../interface/responsable.interface";

const responsableSchema = new Schema({
    usuarioId: String,
    nombre: String
});

export default model<IResponsable>('Responsable', responsableSchema);