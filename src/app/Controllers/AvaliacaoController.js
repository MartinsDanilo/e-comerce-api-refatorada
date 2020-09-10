  import Avaliacao from "../model/Avaliacao";
  import Produto from "../model/Produto";

  class AvaliacaoController {

    // GET /
    async index(req, res) {
      const {
        loja,
        produto
      } = req.query;
      try {
        const avaliacoes = await Avaliacao.find({
          loja,
          produto
        });
        return res.json(avaliacoes);
      } catch (erro) {
        return res.json(erro);
      }
    }

    // GET /:id
    async show(req, res) {
      const {
        loja,
        produto
      } = req.query;

      const {
        id: _id
      } = req.params;

      try {
        const avaliacao = await Avaliacao.findOne({
          _id,
          loja,
          produto
        });

        return res.json(
          avaliacao
        );
      } catch (erro) {
        return res.json(erro);
      }
    }

    // POST / - store
    async store(req, res) {
      const {
        nome,
        texto,
        pontuacao
      } = req.body;

      const {
        loja,
        produto
      } = req.query;

      try {
        const avaliacao = new Avaliacao({
          nome,
          texto,
          pontuacao,
          loja,
          produto
        });

        const _produto = await Produto.findById(produto);
        if (!_produto) {
          return res.status(422).send({
            error: "Produto não existe"
          })
        }
        _produto.avaliacoes.push(avaliacao._id);

        await _produto.save();
        await avaliacao.save();
        return res.json(
          avaliacao
        );
      } catch (erro) {
        res.json(erro);
      }
    }

    // DELETE /:id - remove
    async remove(req, res) {
      try {
        const avaliacao = await Avaliacao.findById(req.params.id);

        const produto = await Produto.findById(avaliacao.produto);
        produto.avaliacoes = produto.avaliacoes.filter(item => item.toString() !== avaliacao._id.toString());
        await produto.save();

        await avaliacao.remove();
        return res.json({
          deletado: true,
        });

      } catch (e) {
        return res.json(e);
      }
    }

  }

  export default new AvaliacaoController();