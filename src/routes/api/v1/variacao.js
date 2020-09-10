//arquivo router de usuario
import {
  Router
} from "express";

import handle from "express-async-handler";

import variacaoController from "../../../app/Controllers/variacaoController";

const routes = new Router();

// - index - show - store - update - delete

routes.post("/variacao", handle(variacaoController.store));
routes.get("/variacao", handle(variacaoController.index));
routes.get("/variacao/:id", handle(variacaoController.show));
routes.put("/variacao/:id", handle(variacaoController.update))
routes.delete("/variacao/:id", handle(variacaoController.remove))

module.exports = routes;