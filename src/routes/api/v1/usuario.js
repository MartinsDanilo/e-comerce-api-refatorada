//arquivo router de usuario
import {
  Router
} from "express";
import Middleware from "../../../app/middlewares/authMiddlewares"
import UsuarioController from "../../../app/Controllers/UsuarioController";
import handle from "express-async-handler"

const routes = new Router();

console.log("Entrando no V1 Usuario")

routes.get("/show", Middleware, UsuarioController.show);
routes.get("/", Middleware, UsuarioController.index);
routes.post("/create", handle(UsuarioController.store));
routes.put("/update", Middleware, UsuarioController.update);


module.exports = routes;