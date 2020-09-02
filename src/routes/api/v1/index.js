import { Router } from "express";

const routes = new Router();

console.log("Entrando no v1 index");

routes.use("/usuario", require("./usuario"));

export default routes;
