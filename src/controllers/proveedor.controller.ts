import { Request, Response, request } from 'express';
import logger from '../utils/logger';
import { IRespuestaPaginada } from '../interface/respuestas/respuesta-paginada.interface';
import { IProveedor } from '../interface/proveedor.interface';
import Proveedor from '../models/Proveedor';

export async function buscarProveedorPorRut(req: Request, res: Response) {
	const { rut } = req.params;
	try {
		const filtroBusqueda = {
			rut: {
				$regex: '^' + rut.toUpperCase(),
			},
			activo: true,
		};
		const respuestaPaginada: IRespuestaPaginada<IProveedor> = {
			totalDocumentos: await Proveedor.find({}).countDocuments(),
			totalItems: await Proveedor.find(filtroBusqueda).countDocuments(),
			items: await Proveedor.find(filtroBusqueda).sort({ rut: 'asc' }).skip(0).limit(5),
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

export async function buscarProveedorPorNombre(req: Request, res: Response){
	const { nombre } = req.params;
	try {
		const filtroBusqueda = {
			nombre: {
				$regex: '^' + nombre.toUpperCase(),
			},
			activo: true,
		};
		const respuestaPaginada: IRespuestaPaginada<IProveedor> = {
			totalDocumentos: await Proveedor.find({}).countDocuments(),
			totalItems: await Proveedor.find(filtroBusqueda).countDocuments(),
			items: await Proveedor.find(filtroBusqueda).sort({ nombre: 'asc' }).skip(0).limit(5),
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
