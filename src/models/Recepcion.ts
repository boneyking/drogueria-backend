import { model } from 'mongoose';
import { IRecepcion } from '../interface/recepcion.interface';
import recepcionSchema from '../schemas/recepcion.schema';

export default model<IRecepcion>('Recepcion', recepcionSchema, 'Recepcion');
