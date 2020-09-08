import Cliente from "../model/Cliente";
import Usuario from "../model/Usuario";

class ClienteController {
  async store(req, res) {
    // const {
    //   loja
    // } = req.query;

    const {
      nome,
      email,
      cpf,
      telefones,
      endereco,
      dataDeNascimento,
      senha,
      loja,
    } = req.body;

    const usuario = await Usuario.create({
      nome,
      email,
      loja,
      senha,
    });

    const cliente = await Cliente.create({
      nome,
      cpf,
      telefones,
      endereco,
      loja,
      dataDeNascimento,
      usuario: usuario.id,
    });

    return res.send({
      cliente: Object.assign({}, cliente._doc, {
        email: usuario.email,
      }),
    });
  }

  async show(req, res) {
    const cliente = await Cliente.findOne({
      usuario: req.params.id,
      loja: req.query.loja,
    }).populate({
      path: "usuario",
      // select: "-cnpj -hash"
    });

    return res.json(cliente);
  }

  async update(req, res) {
    const clienteExistente = await Cliente.findOne({
      usuario: req.params.id,
    }).populate("usuario");


    if (!clienteExistente) {
      return res.status(400).json({
        error: "Cliente não existe.",
      });
    }

    await Usuario.findOneAndUpdate(req.param.id, req.body, {
      new: true,
    })

    const cliente = await Cliente.findOneAndUpdate(req.param.id, req.body, {
      new: true,
    }).populate("usuario");

    return res.json(cliente);

  }
  async remove(req, res) {
    const cliente = await Cliente.findOne({
      usuario: req.params.id,
    }).populate("usuario");

    await cliente.usuario.remove();

    cliente.deletado = true;

    await cliente.save();

    return res.json(cliente);
  }
}

export default new ClienteController();