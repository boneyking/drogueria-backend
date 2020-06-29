import { Schema, model } from 'mongoose';
import { IArsenal } from '../interface/arsenal.interface';
import arsenalSchema from '../schemas/arsenal.schema';

arsenalSchema.methods.verificaExistenciaArsenal = async function (nombre: string): Promise<Boolean> {
	return (await nombre) === this.nombre;
};

arsenalSchema.index({ text: 1, type: -1 });

export default model<IArsenal>('Arsenal', arsenalSchema, 'Arsenal');
