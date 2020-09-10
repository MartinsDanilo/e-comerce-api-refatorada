//arquivo router de usuario
import {
  Router
} from "express";

import handle from "express-async-handler";

import avaliacaoController from "../../../app/Controllers/avaliacaoController";

const routes = new Router();

// - index - show - store - update - delete

routes.post("/avaliacao", handle(avaliacaoController.store));
routes.get("/avaliacao", handle(avaliacaoController.index));
routes.get("/avaliacao/:id", handle(avaliacaoController.show));
routes.put("/avaliacao/:id", handle(avaliacaoController.update))
routes.delete("/avaliacao/:id", handle(avaliacaoController.remove))

module.exports = routes;