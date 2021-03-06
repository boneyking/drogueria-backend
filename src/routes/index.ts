import { Router } from "express";
import { createPhoto, getPhotos, getPhoto } from "../controllers/foto.controller";

import multer from "../libs/multer";
import { obtenerArticulos, crearArticulo, verificarExistenciaCodigoBarra } from "../controllers/articulo.controller";

import {ingresar, crearUsuarioInicial} from '../controllers/login.controller';
import { crearArsenal, obtenerArsenalPaginado, buscarArsenalPorNombre } from "../controllers/arsenal.controller";
import { cargarProveedores, cargarArsenal } from "../controllers/data-inicial.controller";
import { crearRecepcion } from "../controllers/recepcion.controller";
import { buscarProveedorPorRut, buscarProveedorPorNombre } from "../controllers/proveedor.controller";

const router = Router();

router.route("/photos").post(multer.single("image"), createPhoto).get(getPhotos);
router.route("/photos/:id").get(getPhoto);

router.route('/articulo/lista').get(obtenerArticulos);
router.route('/articulo/crearArticulo').post(crearArticulo);
router.route('/articulo/:codigoBarra').get(verificarExistenciaCodigoBarra);

router.route('/login').post(ingresar);

router.route('/crearUsuarioInicial').post(crearUsuarioInicial);

router.route('/arsenal/crearArsenal').post(crearArsenal);
router.route('/arsenal/obtenerArsenalPaginado',).post(obtenerArsenalPaginado);
router.route('/arsenal/buscarArsenalPorNombre/:nombre').get(buscarArsenalPorNombre);

router.route('/data-inicial/proveedor').post(cargarProveedores);
router.route('/data-inicial/arsenal').post(cargarArsenal);

router.route('/recepcion').post(crearRecepcion);

router.route('/proveedor/buscarProveedorPorRut/:rut').get(buscarProveedorPorRut);
router.route('/proveedor/buscarProveedorPorNombre/:nombre').get(buscarProveedorPorNombre);

export default router;
