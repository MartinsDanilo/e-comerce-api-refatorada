import * as Yup from "yup";
import Usuario from "../model/Usuario";

class LoginController {
  async store(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      senha: Yup.string().required(),
    });

    const camposValidos = await schema.isValid(req.body);

    if (!camposValidos) {
      return res.status(400).json({
        error: "Preencha os campos corretamente!",
      });
    }

    const {
      email,
      senha
    } = req.body;

    const usuario = await Usuario.findOne({
      email
    });

    if (!usuario) {
      return res.status(400).json({
        erro: "Usuario não cadastrado!"
      });
    }
    debugger
    const comparaSenha = await usuario.checaSenha(senha);

    if (!comparaSenha) {
      return res.status(400).json({
        erro: "Senha incorreta!",
      });
    }

    return res.json({
      token: Usuario.geratoken(usuario),
    });
  }
}

export default new LoginController();