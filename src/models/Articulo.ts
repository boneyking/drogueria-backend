import { Schema, model } from 'mongoose';
import { IArticulo } from '../interface/articulo.interface';

const articuloSchema = new Schema({
	codigoBarra: {
		type: String,
		unique: true,
		required: true,
		lowercase: true,
		trim: true,
	},
	nombre: String,
	descripcion: String,
	cantidad: {
		type: Number,
		default: 0,
	},
	lote: {
		id: {
			type: String,
			unique: true,
			required: true,
			lowercase: true,
			trim: true,
		},
		identificador: {
			type: String,
			unique: true,
			required: true,
			lowercase: true,
			trim: true,
		},
		fechaVencimiento: Date,
	},
	responsable: {
		usuarioId: String,
		nombre: String,
	},
	activo: {
		type: Boolean,
		default: true,
	},
	fechaCreacion: {
		type: Date,
		default: new Date()
	},
	fechaModificacion: {
		type: Date,
		default: new Date()
	},
});

export default model<IArticulo>('Articulo', articuloSchema);
