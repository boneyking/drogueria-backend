import { Request, Response } from 'express';
import Recepcion from '../models/Recepcion';

export async function crearRecepcion(req: Request, res: Response) {
	const {id, fechaIngreso, folio, informacionDocumento, articulos, origen, responsable} = req.body;
	try {
		const recepcionNuevo = {
			id: id,
			fechaIngreso: fechaIngreso,
			folio: folio,
			informacionDocumento: informacionDocumento,
			articulos: articulos,
			origen: origen,
			responsable: responsable,
		};
		const recepcion = new Recepcion(recepcionNuevo);
		const resultado = await recepcion.save();

		return res.status(200).json({
			mensaje: 'ok',
			resultado: resultado
		});
	} catch (error) {
		return res.status(400).json({ mensaje: error.message });
	}
}
