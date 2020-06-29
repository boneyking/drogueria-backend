import { Schema } from 'mongoose';

const informacionPersonalSchema = new Schema({
	id: {
		type: String,
		unique: true,
		required: true,
		trim: true,
	},
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
