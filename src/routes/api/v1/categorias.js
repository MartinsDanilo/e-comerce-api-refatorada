//arquivo router de usuario
import {
  Router
} from "express";

import handle from "express-async-handler";

import CategoriaController from "../../../app/Controllers/CategoriasController";

const routes = new Router();

// - index - show - store - update - delete

routes.post("/categorias", handle(CategoriaController.store));
routes.get("/categorias", handle(CategoriaController.index));
routes.get("/categorias/:id", handle(CategoriaController.show));
routes.put("/categorias/:id", handle(CategoriaController.update))
routes.delete("/categorias/:id", handle(CategoriaController.remove))

module.exports = routes;