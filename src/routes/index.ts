import { Router } from "express";
import { createPhoto, getPhotos, getPhoto } from "../controllers/foto.controller";

import multer from "../libs/multer";
import { obtenerArticulos, crearArticulo } from "../controllers/articulo.controller";

import {ingresar} from '../controllers/login.controller';

const router = Router();

router.route("/photos").post(multer.single("image"), createPhoto).get(getPhotos);
router.route("/photos/:id").get(getPhoto);

router.route('/articulo/lista').get(obtenerArticulos);
router.route('/articulo').post(crearArticulo);

router.route('/login').post(ingresar);

export default router;
