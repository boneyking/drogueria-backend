import { Schema, model } from 'mongoose';
import { IProveedor } from '../interface/proveedor.interface';

const proveedorSchema = new Schema({
	id: {
		type: String,
		unique: true,
		required: true,
		trim: true,
	},
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

export default model<IProveedor>('Proveedor', proveedorSchema, 'Proveedor');