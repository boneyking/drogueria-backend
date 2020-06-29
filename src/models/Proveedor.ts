import { Schema, model } from 'mongoose';
import { IProveedor } from '../interface/proveedor.interface';
import proveedorSchema from '../schemas/proveedor.schema';

export default model<IProveedor>('Proveedor', proveedorSchema, 'Proveedor');