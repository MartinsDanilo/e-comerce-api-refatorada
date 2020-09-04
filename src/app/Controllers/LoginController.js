import * as Yup from "yup";
import Usuario from "../model/Usuario";

class LoginController {
  async store(req, res) {
    const {
      email,
      senha
    } = req.body;

    const usuario = await Usuario.findOne({
      email
    })

    const comparaSenha = await usuario.checaSenha(senha);

    if (!comparaSenha) {
      return res.status(400).json({
        erro: "Senha incorreta!"
      })
    }

    return res.json("Senha correta")

  }
}

export default new LoginController();

// const {
//   email,
//   nome
// } = req.body;

// const senha = 12345;


// debugger

// const usuario = await Usuario.findOne({
//   email
// });

// const testesenha = await usuario.checaSenha(senha);

// debugger


// return res.json(
//   testesenha
// )