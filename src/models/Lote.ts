import { Schema, model } from "mongoose";
import { ILote } from "../interface/lote.interface";

const loteSchema = new Schema({
    identificador: String,
    fechaVencimiento: Date
});

export default model<ILote>('Lote', loteSchema);