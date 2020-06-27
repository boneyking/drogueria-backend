import { Schema, model } from 'mongoose';
import { IArsenal } from '../interface/arsenal.interface';

const arsenalSchema = new Schema({
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

arsenalSchema.methods.verificaExistenciaArsenal = async function(nombre:string): Promise<Boolean> {
	return await nombre === this.nombre;
}

arsenalSchema.index({text: 1, type: -1});

export default model<IArsenal>('Arsenal', arsenalSchema, 'Arsenal');
