import Usuario from "../model/Usuario";
import * as Yup from "yup";

class UsuarioController {
  async show(req, res) {

    const usuario = await Usuario.find({}, ["nome", "email", "loja"]);

    return res.json(usuario)

  }
  async index(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
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

    const usuario = await Usuario.findOne({
      email
    });

    debugger

    console.log("usuario ", usuario)

    if (!usuario) {
      return res.status(400).json({
        erro: "Usuario nao cadastrado"
      });
    }

    try {
      const {
        nome,
        email,
        loja
      } = usuario;

      return res.json({
        nome,
        email,
        loja
      });

    } catch (error) {

      return res.status(500).json({
        erro: "error"
      })
    }
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

  async update(req, res) {
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
      senhaHash,
      email
    } = req.body;

    const usuario = await Usuario.findOne({
      _id: req.userId,
    });

    const senhaCorreta = await usuario.checaSenha(senhaHash);

    if (!senhaCorreta) {
      return res.status(400).json({
        erro: "Senha incorreta",
      });
    }
    const emailExistente = await Usuario.findOne({
      email,
    });

    if (emailExistente) {
      return res.status(400).json({
        erro: "Email ja cadastrado!",
      });
    }
    try {
      const usuario = await Usuario.findOneAndUpdate(req.userId, req.body, {
        new: true,
      });

      return res.send(usuario);
    } catch (error) {
      return res.send(error);
    }
  }
}

export default new UsuarioController();