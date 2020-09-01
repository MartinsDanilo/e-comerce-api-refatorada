//arquivo router de usuario
import {
    Router
} from "express";

import UsuarioController from "../../../Controllers/UsuarioController";

const routes = new Router();

console.log("Entrando no V1 Usuario")

routes.get("/console", UsuarioController.index);
routes.post("/create", UsuarioController.store);


module.exports = routes;