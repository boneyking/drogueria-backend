import { Schema } from 'mongoose';
import idSchema from './id.schema';
import articuloSchema from './articulo.schema';
import responsableSchema from './responsable.schema';

const movimientoSchema = new Schema({
	id: idSchema,
	articulo: articuloSchema,
	stockActual: Number,
	tipoMovimiento: {
		type: String,
		required: true,
	},
	responsable: responsableSchema,
	fecha: {
		type: Date,
		required: true,
	},
});

export default movimientoSchema;
