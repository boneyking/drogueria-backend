import { Request, Response } from 'express';
import Arsenal from '../models/Arsenal';
import { IArsenal, ArsenalTipo } from '../interface/arsenal.interface';
import { v4 as uuidv4 } from 'uuid';


export async function crearArsenal(req: Request, res: Response) {
	try {
		const { id, nombre, responsable } = req.body;

		const arsenalNuevo = {
			id: id,
			nombre: nombre,
			responsable: {
				usuarioId: responsable.usuarioId,
				nombre: responsable.nombre,
			},
		};

		const arsenal = new Arsenal(arsenalNuevo);
		const resultado = await arsenal.save();
		res.status(200).json({
			mensaje: resultado,
		});
	} catch (error) {
		res.status(400).json({ mensaje: error.message });
	}
}
