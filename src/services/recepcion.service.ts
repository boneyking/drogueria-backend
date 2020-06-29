import logger from '../utils/logger';
import { EventosSocket } from '../enums/eventos-socket.enum';
import Recepcion from '../models/Recepcion';

module.exports.guardarRecepcion = async (recepcionNuevo: any) => {
	const app = require('../app');
	const socket = app.obtenerSocket();

	try {
		const recepcion = new Recepcion(recepcionNuevo);
		await recepcion.save();
		socket.emit(`${EventosSocket.RecepcionCreada}`, { mensaje: `Recepcion folio: "${recepcionNuevo.folio}"` });
	} catch (error) {
		logger.error(`guardarRecepcion: ${error.message}`);
		socket.emit(`${EventosSocket.RecepcionNoCreada}_${recepcionNuevo.responsable.usuarioId}`, {
			mensaje: `Error: ${error.message}`,
		});
	}
};
