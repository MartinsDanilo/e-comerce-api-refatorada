//arquivo router de usuario
import {
    Router
  } from "express";
  
  import handle from "express-async-handler"
  import Middleware from "../../../app/middlewares/authMiddlewares";
  
  import PedidoController from "../../../app/Controllers/PedidoController";
  
  const routes = new Router();
  
  routes.post("/loja", handle(LojaController.store));
  
  //routes.use(Middleware);
  
  routes.get("/pedido", handle(PedidoController.index));
  routes.get("/pedido/:id", handle(PedidoController.show));
  routes.put("/pedido", handle(PedidoController.update));
  routes.delete("/pedido", handle(PedidoController.remove));
  
  module.exports = routes;