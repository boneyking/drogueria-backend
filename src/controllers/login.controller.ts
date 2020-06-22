import { Request, Response } from 'express';
import Usuario from '../models/Usuario';
import { IUsuario } from '../interface/usuario.interface';
import jwt from 'jsonwebtoken';
import config from '../config/config';
import { v4 as uuidv4 } from 'uuid';

function crearToken(usuario: IUsuario) {
	return jwt.sign(
		{
			id: usuario.id,
			rut: usuario.rut,
			nombreUsuario: usuario.informacionPersonal.nombres + ' ' + usuario.informacionPersonal.apellidos,
			cargo: usuario.informacionPersonal.cargo,
			roles: usuario.roles,
		},
		config.jwtSecret,
		{
			expiresIn: 86400,
		}
	);
}
import { IRespuestaLogin } from '../interface/respuesta-login.interface';

export const ingresar = async (req: Request, res: Response): Promise<Response> => {
	const respuestaLogin: IRespuestaLogin = {
		mensaje: '',
		token: '',
	};
	if (!req.body.rut || !req.body.password) {
		respuestaLogin.mensaje = 'Indique email y contraseña.';
		return res.status(200).json(respuestaLogin);
	}

	const user = await Usuario.findOne({ rut: req.body.rut });
	if (!user) {
		respuestaLogin.mensaje = 'El usuario indicado no existe.';
		return res.status(200).json(respuestaLogin);
	}

	const isMatch = await user.compararPassword(req.body.password);
	if (isMatch) {
		respuestaLogin.mensaje = 'Usuario ingresado';
		respuestaLogin.token = crearToken(user);
		return res.status(200).json(respuestaLogin);
	}
	respuestaLogin.mensaje = 'El email o contraseña indicados estan incorrectos.';
	return res.status(200).json(respuestaLogin);
};

export const registrar = async (req: Request, res: Response): Promise<Response> => {
	if (!req.body.email || !req.body.password) {
		return res.status(400).json({ mensaje: 'Indique email y contraseña.' });
	}

	const usuario = await Usuario.findOne({ rut: req.body.rut });
	if (usuario) {
		return res.status(400).json({ mensaje: 'Ya existe un usuario registrado con ese Rut.' });
	}

	const nuevoUsuario = new Usuario(req.body);
	await nuevoUsuario.save();
	return res.status(201).json({
		mensaje: 'Usuario registrado correctamente.',
		usuario: nuevoUsuario,
	});
};

export const crearUsuarioInicial = async (req: Request, res: Response): Promise<Response> => {
	if (req.body.claveMagica !== 'Admindev001') {
		return res.status(400).json({ mensaje: 'clave mágica no corresponde' });
	}

	const usuario = await Usuario.findOne({ rut: '157895591' });
	if (usuario) {
		return res.status(400).json({ mensaje: 'Ya existe un usuario registrado con ese Rut.' });
	}

	const nuevoUsuario = new Usuario();
	nuevoUsuario.rut = '157895591';
	nuevoUsuario.password = '123456';
	nuevoUsuario.informacionPersonal.id = uuidv4();
	nuevoUsuario.informacionPersonal.nombres = 'Fabricio';
	nuevoUsuario.informacionPersonal.apellidos = 'Tello';
	nuevoUsuario.informacionPersonal.cargo = 'Administrador';
	await nuevoUsuario.save();
	return res.status(200).json({ mensaje: 'usuario creado' });
};
