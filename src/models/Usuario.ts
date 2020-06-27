import { model, Schema, Document } from 'mongoose';
import bcrypt from 'bcrypt';
import { IUsuario } from '../interface/usuario.interface';

const usuarioSchema = new Schema({
	rut: {
		type: String,
		unique: true,
		required: true,
		lowercase: true,
		trim: true,
	},
	password: {
		type: String,
		required: true,
	},
	informacionPersonal: {
		id: String,
		nombres: String,
		apellidos: String,
		cargo: String,
	},
});

usuarioSchema.pre<IUsuario>('save', async function (next) {
	const user = this;

	if (!user.isModified('password')) return next();

	const salt = await bcrypt.genSalt(10);
	const hash = await bcrypt.hash(user.password, salt);
	user.password = hash;

	next();
});

usuarioSchema.methods.compararPassword = async function (password: string): Promise<Boolean> {
	return await bcrypt.compare(password, this.password);
};

export default model<IUsuario>('Usuario', usuarioSchema, 'Usuario');
