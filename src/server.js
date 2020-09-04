  import Usuario from "./app/model/Usuario"
  import app from "./app";

  app.get("/teste", async (req, res) => {

    const {
      email,
      senha
    } = req.body;

    const usuario = await Usuario.findOne({
      email
    });

    const testeSenha = await usuario.checaSenha(senha)

    if (!testeSenha) {
      return res.status(400).json({
        erro: "Senha incorreta!"
      })
    }

    return res.send("Senha correta!")
  })

  app.listen(3000, () => {
    console.log("Servidor ON!");
  });