import { Schema } from "mongoose";

const responsableSchema = new Schema({
    usuarioId: String,
    nombre: String
});

export default responsableSchema;