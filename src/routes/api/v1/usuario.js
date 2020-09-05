//arquivo router de usuario
import { Router } from "express";
import Middleware from "../../../app/middlewares/authMiddlewares";
import UsuarioController from "../../../app/Controllers/UsuarioController";
import handle from "express-async-handler";

const routes = new Router();

console.log("Entrando no V1 Usuario");

// - index - show - store - update - delete

routes.post("/registrar", handle(UsuarioController.store));
routes.get("/show", Middleware, handle(UsuarioController.show));
routes.get("/index", Middleware, handle(UsuarioController.index));
routes.put("/", Middleware, handle(UsuarioController.update));
routes.delete("/", Middleware, handle(UsuarioController.remove));

module.exports = routes;
