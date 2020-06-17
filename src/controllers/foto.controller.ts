import { Request, Response } from "express";
import Foto from '../models/Foto';

export async function getPhotos(req: Request, res: Response): Promise<Response> {
    const fotos = await Foto.find();

    return res.json(fotos);
}

export async function getPhoto(req: Request, res: Response): Promise<Response> {
    const {id} = req.params;
    try {
        const foto = await Foto.findById(id);
        return res.json(foto);    
    } catch (error) {
        return res.json({
            mensaje: 'foto no encontrada por id ', id,
            error
        });
    }
    
}

export async function createPhoto(req: Request, res: Response): Promise<Response> {
  const { title, description } = req.body;
  const newPhoto = {
    title: title,
    description: description,
    imagePath: req.file.path
  };

  const foto = new Foto(newPhoto);
  await foto.save();

  return res.json({
    message: "foto guardada",
    foto
  });
}
