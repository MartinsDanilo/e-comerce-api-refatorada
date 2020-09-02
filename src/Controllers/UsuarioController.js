import Usuario from "../model/Usuario";
import * as Yup from "yup";

class UsuarioController {
  async index(req, res) {
    const { nome } = req.body;

    return res.json({
      nome,
    });
  }

  // POST /registrar
  async store(req, res) {
    const schema = Yup.object().shape({
      nome: Yup.string().required(),
      email: Yup.string().email().required(),
      senhaHash: Yup.string().required(),
      confirmarSenha: Yup.string().when("senhaHash", (senhaHash, field) =>
        senhaHash ? field.required().oneOf([Yup.ref("senhaHash")]) : field
      ),
    });

    const camposValidos = await schema.isValid(req.body);

    console.log(camposValidos);

    if (!camposValidos) {
      return res.status(400).json({
        error: "Preencha os campos corretamente!",
      });
    }

    const { email } = req.body;

    const usuarioExistente = await Usuario.findOne({
      email,
    });

    if (usuarioExistente) {
      return res.status(400).json({
        error: "Email ja cadastrado",
      });
    }

    const usuario = await Usuario.create(req.body);

    return res.json(usuario);
  }
}

export default new UsuarioController();
