import responsableSchema from './responsable.schema';
import articuloSchema from './articulo.schema';
import proveedorSchema from './proveedor.schema';
import { Schema } from 'mongoose';

const recepcionSchema = new Schema({
	id: {
		type: String,
		unique: true,
		required: true,
		trim: true,
	},
	fechaIngreso: {
		type: Date,
		required: true,
	},
	folio: {
		type: String,
		unique: true,
		required: true,
		trim: true,
	},
	informacionDocumento: {
		proveedor: proveedorSchema,
		documentoTipo: {
			type: String,
			required: true,
		},
		identificadorDocumento: {
			type: String,
			required: true,
			unique: true,
			trim: true,
		},
	},
	articulos: [articuloSchema],
	origen: {
		type: String,
		required: true,
	},
	responsable: responsableSchema,
	fechaTermino: {
		type: Date,
		required: true,
		default: new Date(),
	},
});

export default recepcionSchema;
