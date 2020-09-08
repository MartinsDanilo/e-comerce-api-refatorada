//arquivo router de usuario
import {
  Router
} from "express";

import handle from "express-async-handler"

import ProdutoController from "../../../app/Controllers/ProdutoController";

const routes = new Router();

routes.post("/produto", handle(ProdutoController.store));
routes.put("/produto/:id", handle(ProdutoController.update));

module.exports = routes;