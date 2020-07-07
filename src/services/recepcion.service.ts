import logger from '../utils/logger';
import { EventosSocket } from '../enums/eventos-socket.enum';
import Recepcion from '../models/Recepcion';
import Movimiento from '../models/Movimiento';
import {v4 as uuidv4} from 'uuid';
import { IMovimiento } from '../interface/movimiento.interface';
import { TipoMovimiento } from '../enums/tipo-movimiento.enum';

const movimientoService = require('./movimiento.service');
const articuloService = require('./articulo.service');

module.exports.guardarRecepcion = async (recepcionNuevo: any) => {
	const app = require('../app');
	const socket = app.obtenerSocket();

	try {
		const recepcion = new Recepcion(recepcionNuevo);
		const recepcionGuardado = await recepcion.save();
		socket.emit(`${EventosSocket.RecepcionCreada}`, { mensaje: `Recepcion folio: "${recepcionNuevo.folio}"` });

		

		recepcionGuardado.articulos.forEach(articulo => {
			let cantidadEntrada = 0;
			articulo.lote.forEach(lote => {
				cantidadEntrada += lote.cantidadEntrada;
			});

			articuloService.guardarArticulo(articulo);

			const nuevoMovimiento = {
				id: uuidv4(),
				articulo: articulo,
				stockActual: cantidadEntrada,
				tipoMovimiento: TipoMovimiento.Entrada,
				responsable: articulo.responsable,
				fecha: new Date()
			}
			movimientoService.crearMovimiento(nuevoMovimiento);
		});

		// await movimientoService.crearMovimiento()
	} catch (error) {
		logger.error(`guardarRecepcion: ${error.message}`);
		socket.emit(`${EventosSocket.RecepcionNoCreada}_${recepcionNuevo.responsable.usuarioId}`, {
			mensaje: `Error: ${error.message}`,
		});
	}
};
