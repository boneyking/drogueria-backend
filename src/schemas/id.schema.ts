import { Schema } from "mongoose";

const idSchema = new Schema({
	id: {
		type: String,
		unique: true,
		required: true,
		lowercase: true,
		trim: true,
	},
});

export default idSchema;