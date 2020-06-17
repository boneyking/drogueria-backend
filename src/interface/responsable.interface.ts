import { Document} from 'mongoose';
export interface IResponsable extends Document{
  usuarioId: string;
  nombre: string;
}
