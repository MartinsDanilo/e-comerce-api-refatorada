import Usuario from "../model/Usuario";
import * as Yup from "yup";

class UsuarioController {
  async show(req, res) {
    const usuario = await Usuario.find({}, ["nome", "email", "loja"]);

    return res.json(usuario);
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

    const { email } = req.body;

    const usuario = await Usuario.findOne({
      email,
    });

    if (!usuario) {
      return res.status(400).json({
        erro: "Usuario nao cadastrado",
      });
    }

    try {
      const { nome, email, loja } = usuario;

      return res.json({
        nome,
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

    const { email } = req.body;

    const usuario = await Usuario.findOne({
      email,
    });

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
      return res.status(500).json({ erro: "Erro interno do servidor" });
    }
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

    const { senhaHash, email } = req.body;

    const usuario = await Usuario.findOne({
      _id: req.userId,
    });

    if (!usuario) {
      return res.status(400).json({ erro: "Usuario não cadastrado!" });
    }

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

  async remove(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      senha: Yup.string().required(),
      confirmarSenha: Yup.string().when("senha", (senha, field) =>
        senha ? field.required().oneOf([Yup.ref("senha")]) : field
      ),
    });

    const camposValidos = await schema.isValid(req.body);

    if (!camposValidos) {
      return res.status(400).json({
        error: "Preencha os campos corretamente!",
      });
    }

    const { senha, email } = req.body;

    const usuario = await Usuario.findById({ _id: req.userId });

    debugger;

    if (!usuario) {
      return res.status(400).json({ erro: "Usuario não existe!" });
    }

    debugger;

    const confirmaSenha = await usuario.checaSenha(senha);

    if (!confirmaSenha) {
      return res.status(400).json({ erro: "Senha incorreta!" });
    }

    return usuario.remove({});
  }
}

export default new UsuarioController();
