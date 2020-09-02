import express from "express";
import routes from "./routes/api/v1/index";
import databaseConfig from "./app/config/database";
import mongoose from "mongoose";

class App {
  constructor() {
    this.server = express();
    this.database();
    this.middlewares();
    this.routes();
  }

  database() {
    mongoose
      .connect(databaseConfig.uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log("Conexão com mongo realizada com sucesso!");
      })
      .catch((erro) => {
        console.log(erro, " Conexão com mongo falhou!");
      });
  }

  middlewares() {
    this.server.use(express.json());
  }
  routes() {
    this.server.use(routes);
  }
}
export default new App().server;