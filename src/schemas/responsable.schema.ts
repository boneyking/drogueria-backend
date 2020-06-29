import { Schema } from 'mongoose';

const responsableSchema = new Schema({
	usuarioId: {
		type: String,
		required: true,
	},
	nombre: {
		type: String,
		required: true,
	},
});

export default responsableSchema;
