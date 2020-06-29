import { Schema } from 'mongoose';
import idSchema from './id.schema';

const informacionPersonalSchema = new Schema({
	id: idSchema,
	nombres: {
		type: String,
		required: true,
	},
	apellidos: {
		type: String,
		required: true,
	},
	cargo: {
		type: String,
		required: true,
	},
});

export default informacionPersonalSchema;
