import Categoria from "../model/Categoria"

class CategoriasController {
  async store(req, res) {

    const {
      nome,
      codigo
    } = req.body;

    const {
      loja
    } = req.query;

    const categoria = await Categoria.create({
      nome,
      codigo,
      loja,
      disponibilidade: true
    });

    return res.json(categoria);
  }
}


export default new CategoriasController();