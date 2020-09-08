//arquivo router de usuario
import {
  Router
} from "express";

import handle from "express-async-handler";

import CategoriaController from "../../../app/Controllers/CategoriasController";

const routes = new Router();

// - index - show - store - update - delete

routes.post("/categorias", handle(CategoriaController.store));

module.exports = routes;