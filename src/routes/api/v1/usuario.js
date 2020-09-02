//arquivo router de usuario
import {
  Router
} from "express";
import Middleware from "../../../app/middlewares/authMiddlewares"
import UsuarioController from "../../../app/Controllers/UsuarioController";

const routes = new Router();

console.log("Entrando no V1 Usuario")

routes.get("/console", UsuarioController.index);
routes.post("/create", UsuarioController.store);


routes.get("/update", Middleware, UsuarioController.update);


module.exports = routes;