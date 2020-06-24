import { Request, Response } from 'express';
import Articulo from '../models/Articulo';

export async function obtenerArticulos(req: Request, res: Response) {
	try {
		const articulos = await Articulo.find();
		return res.json(articulos);
	} catch (error) {
		return res.json({
			mensaje: 'Error al obtener articulos.',
			error: error,
		});
	}
}

export async function crearArticulo(req: Request, res: Response) {
	try {
		const { codigoBarra, nombre, descripcion, cantidad, lote, responsable } = req.body;
		const articuloNuevo = {
			codigoBarra: codigoBarra,
			nombre: nombre,
			descripcion: descripcion,
			cantidad: cantidad,
			lote: {
				id: lote.id,
				identificador: lote.identificador,
				fechaVencimiento: lote.fechaVencimiento,
			},
			responsable: {
				usuarioId: responsable.usuarioId,
				nombre: responsable.nombre,
			},
			activo: true,
			fechaCreacion: new Date(),
			fechaModificacion: new Date(),
		};
		const articulo = new Articulo(articuloNuevo);
		await articulo.save();

		return res.send(200).json({
			mensaje: 'Articulo creado',
			articulo: articulo,
		});
	} catch (error) {
		return res.send(200).json({
			mensaje: 'Error al crear articulo.',
			error: error,
		});
	}
}

export async function verificarExistenciaCodigoBarra(req: Request, res: Response) {
	try {
		const articulo = await Articulo.findOne({ codigoBarra: req.params.codigoBarra });
		return res.json({
			articulo
		});
	} catch (error) {
		return res.json({
			mensaje: 'Error al verificar existencia de código de barra.',
		});
	}
}
