import {
  Router
} from "express";

const routes = new Router();

console.log("Entrando no v1 index");

routes.use("/usuario", require("./usuario"));
routes.use(require("./login"));
routes.use(require("./cliente"));
routes.use(require("./loja"));
routes.use(require("./categorias"));
routes.use(require("./produto"));

export default routes;