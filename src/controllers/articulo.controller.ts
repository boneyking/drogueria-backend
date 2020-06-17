import { Request, Response } from "express";
import Articulo from '../models/Articulo';
import { v4 as uuidv4 } from 'uuid';


export async function obtenerArticulos(req: Request, res: Response) {
    try {
        const articulos = await Articulo.find();
        return res.json(articulos);
    } catch (error) {
        return res.json({
            mensaje: 'Error al obtener articulos.',
            error
        });
    }    
}

export async function crearArticulo(req: Request, res: Response){
    try {
        const {codigoBarra, nombre, descripcion, cantidad, lote, responsable } = req.body;
        const articuloNuevo = {
            codigoBarra: codigoBarra,
            nombre: nombre,
            descripcion: descripcion,
            cantidad: cantidad,
            lote: {
                id: uuidv4(),
                identificador: lote.identificador,
                fechaVencimiento: lote.fechaVencimiento
            },
            responsable: {
                usuarioId: uuidv4(),
                nombre: responsable.nombre
            },
            activo: true,
            fechaCreacion: new Date(),
            fechaModificacion: new Date()
        };
        const articulo = new Articulo(articuloNuevo);
        await articulo.save();

        return res.json({
            mensaje: 'Articulo creado',
            articulo
        })
        
    } catch (error) {
        return res.json({
            mensaje: 'Error al crear articulo.',
            error
        });
    }
}