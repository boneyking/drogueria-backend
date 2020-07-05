import { model } from 'mongoose';
import movimientoSchema from '../schemas/movimiento.schema';
import { IMovimiento } from '../interface/movimiento.interface';



export default model<IMovimiento>('Movimiento', movimientoSchema, 'Movimientos');
