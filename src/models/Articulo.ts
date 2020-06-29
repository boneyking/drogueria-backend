import { Schema, model } from 'mongoose';
import { IArticulo } from '../interface/articulo.interface';
import articuloSchema from '../schemas/articulo.schema';

export default model<IArticulo>('Articulo', articuloSchema, 'Articulo');
