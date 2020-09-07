//arquivo router de usuario
import {
  Router
} from "express";

import handle from "express-async-handler"
import Middleware from "../../../app/middlewares/authMiddlewares";

import LojaController from "../../../app/Controllers/LojaController";

const routes = new Router();

routes.post("/loja", handle(LojaController.store));

//routes.use(Middleware);

routes.get("/loja", handle(LojaController.index));
routes.get("/loja/:id", handle(LojaController.show));
routes.put("/loja", handle(LojaController.update));
routes.delete("/loja", handle(LojaController.remove));

module.exports = routes;