import { Request, Response } from 'express';
import Arsenal from '../models/Arsenal';
import { IArsenal } from '../interface/arsenal.interface';
import { IRespuestaPaginada } from '../interface/respuestas/respuesta-paginada.interface';
import logger from '../utils/logger';

const arsenalService = require('../services/arsenal.service');

export async function crearArsenal(req: Request, res: Response) {
	const { responsable } = req.body;
	try {
		arsenalService.guardarArsenal(req.body);
		return res.status(200).json({
			mensaje: 'Ok',
		});
	} catch (error) {
		logger.error(error.message);
		const app = require('../app');
		const socket = app.obtenerSocket();

		socket.emit(`arsenalNoCreado_${responsable.usuarioId}`, {
			mensaje: `${error.message}`,
		});
		return res.status(400).json({ mensaje: error.message });
	}
}

export async function obtenerArsenalPaginado(req: Request, res: Response) {
	const { pagina, cantidadResultados, filtro, orden } = req.body;
	try {
		const cantidadSaltados = Number(cantidadResultados) * (Number(pagina) - 1);
		const filtroBusqueda = {
			nombre: {
				$regex: filtro.toUpperCase(),
			},
			activo: true,
		};
		const ordenadoPor = {
			nombre: orden,
		};
		const respuestaPaginada: IRespuestaPaginada<IArsenal> = {
			totalDocumentos: await Arsenal.find({ activo: true }).countDocuments(),
			totalItems: await Arsenal.find(filtroBusqueda).countDocuments(),
			items: await Arsenal.find(filtroBusqueda).sort(ordenadoPor).skip(cantidadSaltados).limit(Number(cantidadResultados)),
		};

		return res.status(200).json({
			items: respuestaPaginada.items,
			totalDocumentos: respuestaPaginada.totalDocumentos,
			totalItems: respuestaPaginada.totalItems,
		});
	} catch (error) {
		logger.error(error.message);
		return res.status(400).json({ mensaje: error.message });
	}
}

export async function buscarArsenalPorNombre(req: Request, res: Response){
	const { nombre } = req.params;
	try {
		const filtroBusqueda = {
			nombre: {
				$regex: '^' + nombre.toUpperCase(),
			},
			activo: true,
		};
		const respuestaPaginada: IRespuestaPaginada<IArsenal> = {
			totalDocumentos: await Arsenal.find({}).countDocuments(),
			totalItems: await Arsenal.find(filtroBusqueda).countDocuments(),
			items: await Arsenal.find(filtroBusqueda).sort({ nombre: 'asc' }).skip(0).limit(5),
		};

		return res.status(200).json({
			items: respuestaPaginada.items,
			totalDocumentos: respuestaPaginada.totalDocumentos,
			totalItems: respuestaPaginada.totalItems,
		});
	} catch (error) {
		logger.error(error.message);
		return res.status(200).json({
			error: error.message,
		});
	}
}
