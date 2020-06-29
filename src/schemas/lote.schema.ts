import { Schema } from 'mongoose';

const loteSchema = new Schema({
	identificador: {
		type: String,
		required: true,
		unique: true,
		trim: true
	},
	fechaVencimiento: {
		type: Date,
		required: true
	},
	valorUnitario:{
		type: Number,
		required:true
	},
	cantidadEntrada:{
		type: Number,
		required: true,
		default: 0
	},
	cantidadSalida:{
		type: Number,
		required: true,
		default: 0
	},
	stock:{
		type: Number,
		required: true,
		default: 0
	}
});

export default loteSchema;
