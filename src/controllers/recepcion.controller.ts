import { Request, Response } from 'express';
import Recepcion from '../models/Recepcion';
import logger from '../utils/logger';

const recepcionService = require('../services/recepcion.service');

export async function crearRecepcion(req: Request, res: Response) {
	try {
		recepcionService.guardarRecepcion(req.body);

		return res.status(200).json({
			mensaje: 'ok',
		});
	} catch (error) {
		logger.error(error.message);
		return res.status(400).json({ mensaje: error.message });
	}
}
