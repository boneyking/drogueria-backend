import { Request, Response } from 'express';
import Arsenal from '../models/Arsenal';
import { IArsenal, ArsenalTipo } from '../interface/arsenal.interface';
import { v4 as uuidv4 } from 'uuid';
import { IRespuestaPaginada } from '../interface/respuesta-paginada.interface';

export async function crearArsenal(req: Request, res: Response) {
	const { id, nombre, arsenalTipo, responsable } = req.body;
	try {
		const arsenalNuevo = {
			id: id,
			nombre: nombre.toUpperCase(),
			arsenalTipo: arsenalTipo,
			responsable: {
				usuarioId: responsable.usuarioId,
				nombre: responsable.nombre,
			},
		};
		guardarArsenal(arsenalNuevo, res);
		res.status(200).json({
			mensaje: 'Ok',
		});
	} catch (error) {
		const app = require('../app');
		const socket = app.obtenerSocket();

		socket.emit(`arsenalNoCreado_${responsable.usuarioId}`, {
			mensaje: `${error.message}`,
		});
		res.status(400).json({ mensaje: error.message });
	}
}

export async function obtenerArsenalPaginado(req: Request, res: Response) {
	const { pagina, cantidadResultados, filtro, ordenarPor, orden } = req.body;
	try {
		const cantidadSaltados = Number(cantidadResultados) * (Number(pagina) - 1);
		console.log(pagina);
		const filtroBusqueda = {
			nombre: {
				$regex: filtro.toUpperCase(),
			},
			activo: true,
		};
		const ordenadoPor = {
			ordenarPor: orden,
		};
		const respuestaPaginada: IRespuestaPaginada<IArsenal> = {
			totalDocumentos: await Arsenal.find({ activo: true }).countDocuments(),
			totalItems: await Arsenal.find(filtroBusqueda).countDocuments(),
			items: await Arsenal.find(filtroBusqueda).sort(ordenadoPor).skip(cantidadSaltados).limit(Number(cantidadResultados)),
		};

		return res.status(200).json({ items: respuestaPaginada.items, totalDocumentos: respuestaPaginada.totalDocumentos, totalItems: respuestaPaginada.totalItems });
	} catch (error) {
		res.status(400).json({ mensaje: error.message });
	}
}

async function guardarArsenal(arsenalNuevo: any, res: Response) {
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
		socket.emit(`arsenalNoCreado_${arsenalNuevo.responsable.usuarioId}`, {
			mensaje: `Error: ${error.message}`,
		});
		res.status(400).json({ mensaje: error.message });
	}
}
