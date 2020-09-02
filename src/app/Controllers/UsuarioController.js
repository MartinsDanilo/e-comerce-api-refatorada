import Usuario from "../model/Usuario";
import * as Yup from "yup";

class UsuarioController {
  async index(req, res) {
    const {
      nome
    } = req.body;

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

    if (!camposValidos) {
      return res.status(400).json({
        error: "Preencha os campos corretamente!",
      });
    }

    const {
      email
    } = req.body;

    const usuarioExistente = await Usuario.findOne({
      email,
    });

    if (usuarioExistente) {
      return res.status(400).json({
        error: "Email ja cadastrado",
      });
    }

    const usuario = await Usuario.create(req.body);

    return res.json({
      usuario,
      token: Usuario.geratoken(usuario),
    });
  }

  // POST /registrar
  async update(req, res) {
    const schema = Yup.object().shape({
      nome: Yup.string().required(),
      email: Yup.string().email().required(),
      senhaHash: Yup.string().required(),
      confirmarSenha: Yup.string().when("senha", (senha, field) =>
        senha ? field.required().oneOf([Yup.ref("senha")]) : field
      ),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: "A validação falhou!"
      });
    }

    const {
      email
    } = req.body;

    const UsuarioExistente = await Usuario.findOne({
      email
    });

    if (UsuarioExistente) {
      return res.status(400).json({
        erro: "Email ja cadastrado!"
      })
    }

    try {
      const {
        senhaHash
      } = await Usuario.findOne({
        email
      });

      if (!senhaHash) {
        return res.status(400).json({
          erro: "Senha incoreta!"
        })
      }
      const usuario = await Usuario.findOneAndUpdate(req.userId, req.body, {
        new: true
      });
      return res.send(usuario);

    } catch (error) {
      return res.status(500);
    }
  }
}

export default new UsuarioController();