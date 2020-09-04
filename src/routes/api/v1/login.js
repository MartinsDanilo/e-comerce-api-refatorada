//arquivo router de usuario
import {
  Router
} from "express";

import handle from "express-async-handler"

import LoginController from "../../../app/Controllers/LoginController";

const routes = new Router();

routes.post("/login", handle(LoginController.store));

module.exports = routes;