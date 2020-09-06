import app from "./app";
import Usuario from "./app/model/Usuario";
import middleware from "../src/app/middlewares/authMiddlewares";

app.listen(3000, () => {
  console.log("Servidor ON!");
});