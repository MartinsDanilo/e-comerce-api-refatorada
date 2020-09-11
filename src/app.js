import express from "express";
import validate from "express-validation";
import Youch from "youch";
import routes from "./routes/api/v1/index";
import databaseConfig from "./app/config/database";
import mongoose from "mongoose";

class App {
  constructor() {
    this.server = express();
    this.database();
    this.middlewares();
    this.routes();
    this.exception();
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

  exception() {
    this.server.use(async (err, req, res, next) => {
      debugger
      if (err instanceof validate.ValidationError) {
        console.log("Deu erro aqui *********************>", err)
        return res.status(400).json(err);

      }
      if (process.env.NODE_ENV !== 'production') {
        const youch = new Youch(err);
        return res.json(await youch.toJSON())
      }
      return res
        .status(err.server || 500)
        .json({
          error: "Erro insterno do servidor"
        });
    });
  }
}
export default new App().server;