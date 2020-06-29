import Arsenal from '../models/Arsenal';
import logger from '../utils/logger';

module.exports.guardarArsenal = async (arsenalNuevo: any) => {
	const app = require('../app');
	const socket = app.obtenerSocket();
	try {
		const nombreArsenalExiste = await Arsenal.find({ nombre: arsenalNuevo.nombre.toUpperCase() });
		if (nombreArsenalExiste.length === 0) {
			const arsenal = new Arsenal(arsenalNuevo);
			await arsenal.save();
			socket.emit('arsenalCreado', { mensaje: `Arsenal "${arsenal.nombre.toUpperCase()}"` });
		} else {
			socket.emit(`arsenalNoCreado_${arsenalNuevo.responsable.usuarioId}`, {
				mensaje: `Arsenal "${arsenalNuevo.nombre.toUpperCase()}" ya existe.`,
			});
		}
	} catch (error) {
		logger.error(`guardarArsenal: ${error.message}`);
		socket.emit(`arsenalNoCreado_${arsenalNuevo.responsable.usuarioId}`, {
			mensaje: `Error: ${error.message}`,
		});
	}
};
