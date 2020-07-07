import { Schema } from 'mongoose';
import idSchema from './id.schema';

const proveedorSchema = new Schema({
	nombre: {
		type: String,
		required: true,
		trim: true,
	},
	rut: {
		type: String,
		unique: true,
		required: true,
		lowercase: true,
		trim: true,
	},
	contactos: [],
	responsable: {
		usuarioId: {
			type: String,
			required: true,
		},
		nombre: {
			type: String,
			required: true,
		},
	},
	activo: {
		type: Boolean,
		default: true,
	},
	fechaCreacion: {
		type: Date,
		default: new Date(),
	},
	fechaModificacion: {
		type: Date,
		default: new Date(),
	},
});

export default proveedorSchema;