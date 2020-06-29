import { Schema } from "mongoose";
import informacionPersonalSchema from "./informacion-personal.schema";

const usuarioSchema = new Schema({
	rut: {
		type: String,
		unique: true,
		required: true,
		lowercase: true,
		trim: true,
	},
	password: {
		type: String,
		required: true,
	},
	informacionPersonal: informacionPersonalSchema
});

export default usuarioSchema;