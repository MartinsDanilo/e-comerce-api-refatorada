//arquivo router de usuario
import {
  Router
} from "express";

import handle from "express-async-handler"

import ClienteController from "../../../app/Controllers/ClienteController";

const routes = new Router();

// - index - show - store - update - delete

routes.post("/cliente", handle(ClienteController.store));

module.exports = routes;