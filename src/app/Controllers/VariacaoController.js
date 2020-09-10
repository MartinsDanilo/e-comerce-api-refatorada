  import Variacao from "../model/Variacao";
  import Produto from "../model/Produto";


  class VariacaoController {

    // GET / - index
    async index(req, res) {
      const {
        loja,
        produto
      } = req.query;
      try {
        const variacoes = await Variacao.find({
          loja,
          produto
        });
        return res.json(
          variacoes
        );
      } catch (erro) {
        return res.json(erro);
      }
    }

    // GET /:id - show
    async show(req, res) {
      const {
        loja,
        produto
      } = req.query;
      const {
        id: _id
      } = req.params;
      try {
        const variacao = await Variacao.findOne({
          loja,
          produto,
          _id
        });
        return res.send({
          variacao
        });
      } catch (erro) {
        return res.json(erro);
      }
    }

    // POST / - store
    async store(req, res) {
      const {
        codigo,
        nome,
        preco,
        promocao,
        entrega,
        quantidade
      } = req.body;
      const {
        loja,
        produto
      } = req.query;
      try {
        const variacao = new Variacao({
          codigo,
          nome,
          preco,
          promocao,
          entrega,
          quantidade,
          loja,
          produto
        });

        const _produto = await Produto.findById(produto);
        if (!_produto) {
          return res.status(400).joson({
            error: "Produto não encontrado."
          });
        }
        _produto.variacoes.push(variacao._id);

        await _produto.save();
        await variacao.save();
        return res.json(
          variacao
        );
      } catch (erro) {
        return res.json(erro);
      }
    }

    // PUT /:id - update
    async update(req, res) {
      const {
        codigo,
        fotos,
        nome,
        preco,
        promocao,
        entrega,
        quantidade
      } = req.body;

      const {
        loja,
        produto
      } = req.query;
      const {
        id: _id
      } = req.params;
      try {

        const variacao = await Variacao.findOne({
          loja,
          produto,
          _id
        });
        if (!variacao) return res.status(400).json({
          error: "Variação não encontrada"
        });

        if (codigo) variacao.codigo = codigo;
        if (nome) variacao.nome = nome;
        if (preco) variacao.preco = preco;
        if (promocao) variacao.promocao = promocao;
        if (entrega) variacao.entrega = entrega;
        if (quantidade) variacao.quantidade = quantidade;
        if (fotos) variacao.fotos = fotos;

        debugger

        await variacao.save();
        return res.json(
          variacao
        );
      } catch (erro) {
        return res.json(erro);
      }
    }

    // DELETE /:id - remove
    async remove(req, res) {
      const {
        loja,
        produto
      } = req.query;

      const {
        id: _id
      } = req.params;

      try {
        const variacao = await Variacao.findOne({
          loja,
          produto,
          _id
        });
        debugger
        if (!variacao) return res.status(400).json({
          error: "Variação não encontrada"
        });

        const _produto = await Produto.findById(variacao.produto);
        _produto.variacoes = _produto.variacoes.filter(item => item.toString() !== variacao._id.toString());
        await _produto.save();

        await variacao.remove();

        return res.json({
          deletado: true
        });

      } catch (erro) {
        return res.json(erro);
      }
    }

  }

  export default new VariacaoController();