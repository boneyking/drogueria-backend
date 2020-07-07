import { Schema } from 'mongoose';
import arsenalSchema from './arsenal.schema';
import loteSchema from './lote.schema';
import responsableSchema from './responsable.schema';
import idSchema from './id.schema';

const articuloSchema = new Schema({
	id: idSchema,
	codigoBarra: {
		type: String,
		unique: true,
		required: true,
		lowercase: true,
		trim: true,
	},
	arsenal: arsenalSchema,
	lote: [loteSchema],
	activo: {
		type: Boolean,
		default: true,
	},
	responsable: responsableSchema,
	fechaCreacion: {
		type: Date,
		default: new Date(),
	},
	fechaModificacion: {
		type: Date,
		default: new Date(),
	},
});

export default articuloSchema;
