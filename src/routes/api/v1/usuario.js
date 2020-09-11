//arquivo router de usuario
import {
  Router
} from "express";
import Middleware from "../../../app/middlewares/authMiddlewares";
import UsuarioController from "../../../app/Controllers/UsuarioController";
import handle from "express-async-handler";
import {
  validate
} from 'express-validation';
import validators from '../../../app/Controllers/validators';

const routes = new Router();

console.log("Entrando no V1 Usuario");

// - index - show - store - update - delete

routes.post("/registrar", validate(validators.usuarioValidation.store), handle(UsuarioController.store));

routes.use(Middleware);

//validate(validators.User),

routes.get("/show", handle(UsuarioController.show));
routes.get("/", handle(UsuarioController.index));
routes.put("/", handle(UsuarioController.update));
routes.delete("/", handle(UsuarioController.remove));

module.exports = routes;