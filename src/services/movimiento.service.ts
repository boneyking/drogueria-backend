import logger from '../utils/logger';
import { EventosSocket } from '../enums/eventos-socket.enum';
import Movimiento from '../models/Movimiento';

module.exports.crearMovimiento = async (movimientoNuevo: any) => {
	const app = require('../app');
	const socket = app.obtenerSocket();
	try {
		const movimiento = new Movimiento(movimientoNuevo);
		const movimientoGuardado = await movimiento.save();
		socket.emit(`${EventosSocket.MovimientoGuardado}`, { mensaje: `Movimiento` });
	} catch (error) {
		socket.emit(`${EventosSocket.MovimientoNoGuardado}`, {
			mensaje: `No se ha guardado el movimiento ${movimientoNuevo.tipoMovimiento}. Favor indicar a administrador fecha y hora del error.`,
		});
		logger.error(`Error al guardar movimiento ${movimientoNuevo.tipoMovimiento}`);
	}
};