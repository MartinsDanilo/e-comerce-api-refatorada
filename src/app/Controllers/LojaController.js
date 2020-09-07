import Loja from "../model/Loja";
import {
  connection
} from "mongoose";
class LojaController {
  async index(req, res) {
    const loja = await Loja.find({}).select("_id nome cnpj email telefones endereco");
    return res.json(loja)
  }
  async show(req, res) {

    const loja = await Loja.findById(req.params.id).select("_id nome cnpj email telefones endereco");

    return res.json(loja);

  }
  async store(req, res) {
    const {
      nome,
      cnpj,
      email,
      telefones,
      endereco
    } = req.body;

    const loja = await Loja.create({
      nome,
      cnpj,
      email,
      telefones,
      endereco
    })

    return res.json(loja);
  }

  async update(req, res) {

    const loja = await Loja.findById(req.query.loja);

    if (!loja) {
      return res.status(422).json({
        error: "Loja não existe!"
      })

    }

    //tratamento de cpf unico

    try {
      const loja = await Loja.findOneAndUpdate(req.query.loja, req.body, {
        new: true
      })
      return res.json(loja)
    } catch (error) {
      return res.status(500).json(error)
    }
  }
  async remove(req, res) {
    const loja = await Loja.findById(req.query.loja)

    if (!loja) {
      return res.status(422).json({
        error: "Loja nao existe"
      })
    }

    loja.remove();

    return res.json(loja)
  }
}

export default new LojaController();