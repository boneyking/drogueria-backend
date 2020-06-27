import { Request, Response } from 'express';
import Arsenal from '../models/Arsenal';
import { IArsenal, ArsenalTipo } from '../interface/arsenal.interface';
import { v4 as uuidv4 } from 'uuid';

export async function crearArsenal(req: Request, res: Response) {
	try {
		const { id, nombre, arsenalTipo, responsable } = req.body;
		const arsenalNuevo = {
			id: id,
			nombre: nombre,
			arsenalTipo: arsenalTipo,
			responsable: {
				usuarioId: responsable.usuarioId,
				nombre: responsable.nombre,
			},
		};
		guardarArsenal(arsenalNuevo);
		res.status(200).json({
			mensaje: 'Ok',
		});
	} catch (error) {
		const app = require('../app');
		const socket = app.obtenerSocket();

		socket.emit('arsenalNoCreado', {
			mensaje: `Error: ${error.message}`,
		});
		res.status(400).json({ mensaje: error.message });
	}
}

function guardarArsenal(arsenalNuevo: any) {
	const app = require('../app');
	const socket = app.obtenerSocket();
	const arsenal = new Arsenal(arsenalNuevo);
	arsenal.save();
	socket.emit('arsenalCreado', { mensaje: `Se ha creado el arsenal "${arsenal.nombre.toUpperCase()}"` });
}
