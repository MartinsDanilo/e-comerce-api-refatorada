import app from "./app";
import Usuario from "./app/model/Usuario";
import middleware from "../src/app/middlewares/authMiddlewares";

app.get("/teste", middleware, (req, res) => {
  const usuario = await Usuario.findOne()
  return res.send("ok");
});

app.listen(3000, () => {
  console.log("Servidor ON!");
});
