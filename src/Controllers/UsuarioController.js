import Usuario from "../model/Usuario";

class UsuarioController {
  async index(req, res) {
    const { nome } = req.body;

    return res.json({
      nome,
    });
  }

  async store(req, res) {
    const usuario = await Usuario.create(req.body);
    console.log(req.body);
    return res.json(usuario);
  }
}

export default new UsuarioController();
