import { Request, Response } from "express";
import Usuario from "../models/Usuario";
import { IUsuario } from "../interface/usuario.interface";
import jwt from "jsonwebtoken";
import config from "../config/config";

function crearToken(usuario: IUsuario) {
  return jwt.sign({ id: usuario.id, email: usuario.rut, roles: usuario.roles }, config.jwtSecret, {
    expiresIn: 86400,
  });
}

export const ingresar = async (
  req: Request,
  res: Response
): Promise<Response> => {
  if (!req.body.rut || !req.body.password) {
    return res.status(400).json({ mensaje: "Indique email y contraseña." });
  }

  const user = await Usuario.findOne({ rut: req.body.rut });
  if (!user) {
    return res.status(400).json({ mensaje: "El usuario indicado no existe." });
  }

  const isMatch = await user.compararPassword(req.body.password);
  if (isMatch) {
    return res
      .status(200)
      .json({ mensaje: "Usuario ingresado.", token: crearToken(user) });
  }

  return res.status(400).json({
    mensaje: "El email o contraseña indicados estan incorrectos.",
  });
};

export const registrar = async (
  req: Request,
  res: Response
): Promise<Response> => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({ mensaje: "Indique email y contraseña." });
  }

  const usuario = await Usuario.findOne({ rut: req.body.rut });
  if (usuario) {
    return res
      .status(400)
      .json({ mensaje: "Ya existe un usuario registrado con ese Rut." });
  }

  const nuevoUsuario = new Usuario(req.body);
  await nuevoUsuario.save();
  return res.status(201).json({
    mensaje: "Usuario registrado correctamente.",
    usuario: nuevoUsuario,
  });
};
