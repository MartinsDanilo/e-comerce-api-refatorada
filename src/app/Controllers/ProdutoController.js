import Produto from "../model/Produto";
import Categoria from "../model/Categoria";
//import Categoria from "../model/Categoria";
import Avaliacao from "../model/Avaliacao";
import Variacao from "../model/Variacao";

const getSort = (sortType) => {
  switch (sortType) {
    case "alfabetica_a-z":
      return {
        titulo: 1,
      };
    case "alfabetica_z-a":
      return {
        titulo: -1,
      };
    case "preco-crescente":
      return {
        preco: 1,
      };
    case "preco-decrescente":
      return {
        preco: -1,
      };
    default:
      return {};
  }
};

class ProdutoController {
  async store(req, res) {
    const {
      titulo,
      descricao,
      categoria: categoriaId,
      preco,
      promocao,
      sku,
    } = req.body;

    const { loja } = req.query;

    const produto = await Produto.create({
      titulo,
      disponibilidade: true,
      descricao,
      categoria: categoriaId,
      preco,
      promocao,
      sku,
      loja,
    });

    const categoria = await Categoria.findById(categoriaId);

    //push normalmente usado para colocar valores em array
    categoria.produtos.push(produto._id); //coloca o is do produto no aarai produtos de categorias(banco)

    debugger;

    await categoria.save();

    return res.json(produto);
  }

  async update(req, res) {
    const {
      titulo,
      descricao,
      disponibilidade,
      fotos,
      categoria,
      preco,
      promocao,
      sku,
    } = req.body;
    const { loja } = req.query;

    const produto = await Produto.findById(req.params.id);

    if (!produto) {
      return res.status(400).json({
        error: "Produto não encontrado.",
      });
    }

    produto.titulo = titulo;
    produto.descricao = descricao;
    produto.disponibilidade = disponibilidade;
    if (fotos) produto.fotos = fotos;
    produto.preco = preco;
    produto.promocao = promocao;
    produto.sku = sku;

    debugger;

    if (categoria && categoria.toString() !== produto.categoria.toString()) {
      const oldCategoria = await Categoria.findById(produto.categoria);
      const newCategoria = await Categoria.findById(categoria);

      if (oldCategoria && newCategoria) {
        oldCategoria.produtos = oldCategoria.produtos.filter(
          (item) => item.toString() !== produto._id.toString()
        );
        newCategoria.produtos.push(produto._id);
        produto.categoria = categoria;
        await oldCategoria.save();
        await newCategoria.save();
      } else if (newCategoria) {
        newCategoria.produtos.push(produto._id);
        produto.categoria = categoria;
        await newCategoria.save();
      }
    }

    await produto.save();

    /*

    const produto = await Produto.findOneAndUpdate(req.param.id, req.body, {
      new: true,
    });

    debugger;
    if (categoria && categoria.toString() !== produto.categoria.toString()) {
      const oldCategoria = await Categoria.findById(produto.categoria);
      const newCategoria = await Categoria.findById(categoria);

      if (oldCategoria && newCategoria) {
        oldCategoria.produtos = oldCategoria.produtos.filter(
          (item) => item.toString() !== produto._id.toString()
        );

        await oldCategoria.save();
        await newCategoria.save();
        debugger;
      } else if (newCategoria) {
        newCategoria.produtos.push(produto._id);
        produto.categoria = categoria;
        await newCategoria.save();
      }
    }

    return res.json(produto);
    */
  }
}

export default new ProdutoController();
