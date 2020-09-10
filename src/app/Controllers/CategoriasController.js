import Categoria from "../model/Categoria"

class CategoriasController {

  // GET / index
  async index(req, res) {
    const categoria = await Categoria.find({
        loja: req.query.loja
      })
      .select("_id produtos nome codigo disponibilidade loja")

    return res.json(categoria)
  }
  // GET /:id show
  async show(req, res) {
    const categoria = await Categoria.findOne({
        loja: req.query.loja,
        _id: req.params.id
      })
      .select("_id produtos nome codigo disponibilidade loja")
      .populate(["produtos"])

    return res.json(categoria)
  }

  // PUT /:id update
  async update(req, res) {
    const {
      nome,
      codigo,
      disponibilidade,
      produtos
    } = req.body;
    try {
      const categoria = await Categoria.findById(req.params.id);

      if (nome) categoria.nome = nome;
      if (disponibilidade !== undefined) categoria.disponibilidade = disponibilidade;
      if (codigo) categoria.codigo = codigo;
      if (produtos) categoria.produtos = produtos;

      await categoria.save();
      return res.json({
        categoria
      });
    } catch (error) {
      return res.json(error);
    }
  }

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
  // DELETE /:id remove
  async remove(req, res, next) {
    try {
      const categoria = await Categoria.findById(req.params.id);
      await categoria.remove();
      return res.send({
        deletado: true
      });
    } catch (e) {
      next(e);
    }
  }


}


export default new CategoriasController();