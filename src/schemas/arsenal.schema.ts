import { Schema } from 'mongoose';
import responsableSchema from './responsable.schema';
import { IArsenal } from '../interface/arsenal.interface';

const arsenalSchema = new Schema<IArsenal>({
	id: {
		type: String,
		unique: true,
		required: true,
		trim: true,
	},
	nombre: {
		type: String,
		unique: true,
		required: true,
		trim: true,
	},
	arsenalTipo: {
		type: String,
		required: true,
	},
	responsable: responsableSchema,
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

export default arsenalSchema;
