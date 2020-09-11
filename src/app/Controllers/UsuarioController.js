import Usuario from "../model/Usuario";
import * as Yup from "yup";

class UsuarioController {
  async index(req, res) {
    const usuario = await Usuario.find({}, ["nome", "email", "loja"]);

    return res.json(usuario);
  }
  async show(req, res) {

    const usuario = await Usuario.findById(
      req.userId,
    );

    if (!usuario) {
      return res.status(400).json({
        erro: "Usuario nao cadastrado",
      });
    }
    try {
      const {
        nome,
        email,
        permissao,
        loja
      } = usuario;

      return res.json({
        nome,
        permissao,
        email,
        loja,
      });
    } catch (error) {
      return res.status(500).json({
        erro: "error",
      });
    }
  }

  // POST /registrar
  async store(req, res) {
    const {
      email
    } = req.body;

    const usuario = await Usuario.findOne({
      email,
    });

    debugger

    if (usuario) {
      return res.status(400).json({
        error: "Email ja cadastrado",
      });
    }

    try {
      const usuario = await Usuario.create(req.body);

      return res.json({
        usuario,
        token: Usuario.geratoken(usuario),
      });
    } catch (error) {
      debugger
      return res.status(500).json({
        erro: `${error}`
      });
    }
  }

  async update(req, res) {
    const {
      senha,
      email
    } = req.body;

    const usuario = await Usuario.findById(req.userId);

    if (!usuario) {
      return res.status(400).json({
        erro: "Usuario não cadastrado!"
      });
    }

    if (usuario.email !== email) {
      const usuarioExistente = await Usuario.findOne({
        email
      }, );

      debugger

      if (usuarioExistente) {
        return res.status(400).json({
          error: 'Usuario ja existe.'
        });
      }
    }

    const senhaCorreta = await usuario.checaSenha(senha);

    if (!senhaCorreta) {
      return res.status(400).json({
        erro: "Senha incorreta",
      });
    }

    try {
      const usuario = await Usuario.findOneAndUpdate(req.userId, req.body, {
        new: true,
      });

      return res.json({
        usuario,
        token: Usuario.geratoken(usuario),
      });

    } catch (error) {
      return res.json(error);
    }
  }

  async remove(req, res) {
    const {
      senha
    } = req.body;

    const usuario = await Usuario.findById(req.userId);


    if (!usuario) {
      return res.status(400).json({
        erro: "Usuario não existe!"
      });
    }

    const confirmaSenha = await usuario.checaSenha(senha);

    if (!confirmaSenha) {
      return res.status(400).json({
        erro: "Senha incorreta!"
      });
    }

    usuario.remove();

    return res.json(usuario)
  }
}

export default new UsuarioController();