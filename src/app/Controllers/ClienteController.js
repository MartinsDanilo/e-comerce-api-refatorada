  import mongoose from "mongoose";
  import Cliente from "../model/Cliente";

  const Usuario = mongoose.model("Usuario");

  class ClienteController {
    async store(req, res) {

      const {
        nome,
        email,
        cpf,
        telefones,
        endereco,
        dataDeNascimento,
        senhaHash,
        loja
      } = req.body;

      //   const {
      //     loja
      //   } = req.query;

      const usuario = await Usuario.create({
        nome,
        email,
        loja,
        senhaHash,
      });

      const cliente = await Cliente.create({
        nome,
        cpf,
        telefones,
        endereco,
        loja,
        dataDeNascimento,
        usuario: usuario._id
      });

      debugger

      return res.send({
        cliente: Object.assign({}, cliente._doc, {
          email: usuario.email
        })
      });
    }
  }

  export default new ClienteController();