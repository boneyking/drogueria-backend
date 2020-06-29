import { Schema } from 'mongoose';

const loteSchema = new Schema({
	identificador: String,
	fechaVencimiento: Date,
});

export default loteSchema;
