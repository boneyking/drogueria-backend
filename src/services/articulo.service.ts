import Articulo from '../models/Articulo';
import { EventosSocket } from '../enums/eventos-socket.enum';
import logger from '../utils/logger';

module.exports.guardarArticulo = async (articuloNuevo: any) => {
	const app = require('../app');
	const socket = app.obtenerSocket();
	try {
		const articuloEncontrado = await Articulo.findOne({ codigoBarra: articuloNuevo.codigoBarra });
		if (articuloEncontrado !== null) {
			// hacer la magia con las cantidades de los lotes actuales o agregar nuevos lotes
			articuloEncontrado.responsable = articuloNuevo.responsable;
			articuloEncontrado.fechaModificacion = new Date();

			await articuloEncontrado.save();
			socket.emit(`${EventosSocket.ArticuloGuardado}`, {
				mensaje: `Se ha actualizado el artículo ${articuloEncontrado.arsenal.nombre}`,
			});
		} else {
			const articulo = new Articulo(articuloNuevo);
			const articuloGuardado = await articulo.save();
			socket.emit(`${EventosSocket.ArticuloGuardado}`, {
				mensaje: `Se ha guardado el artículo ${articuloGuardado.arsenal.nombre}`,
			});
		}
	} catch (error) {
		socket.emit(`${EventosSocket.ArticuloNoGuardado}`, {
			mensaje: `No se ha guardado el artículo ${articuloNuevo.arsenal.nombre}. Favor indicar a administrador fecha y hora del error.`,
		});
		logger.error(`Error al guardar articulo ${articuloNuevo}`);
	}
};
