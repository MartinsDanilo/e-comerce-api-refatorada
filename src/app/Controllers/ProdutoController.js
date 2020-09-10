import Produto from "../model/Produto";
import Categoria from "../model/Categoria";
import * as Yup from "yup";
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

  async update(req, res, next) {
    const schema = Yup.object().shape({
      titulo: Yup.string().required(),
      descricao: Yup.string().email().required(),
      disponibilidade: Yup.string().required(),
      categoria: Yup.string().required(),
      preco: Yup.string().required(),
      promocao: Yup.string().required(),
      sku: Yup.string().required(),
    });

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

    try {
      const produto = await Produto.findById(req.params.id);
      if (!produto)
        return res.status(400).send({
          error: "Produto não encontrado.",
        });

      produto.titulo = titulo;
      produto.descricao = descricao;
      produto.disponibilidade = disponibilidade;
      produto.fotos = fotos;
      produto.preco = preco;
      produto.promocao = promocao;
      produto.sku = sku;

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

      return res.send({
        produto,
      });
    } catch (e) {
      next(e);
    }
  }
  // DELETE :/id - remove
  async remove(req, res) {
    const { loja } = req.query;

    try {
      const produto = await Produto.findOne({ _id: req.params.id, loja });
      if (!produto)
        return res.status(400).send({ error: "Produto não encontrado." });

      const categoria = await Categoria.findById(produto.categoria);
      if (categoria) {
        categoria.produtos = categoria.produtos.filter(
          (item) => item !== produto._id
        );
        await categoria.save();
      }

      await produto.remove();
      return res.json({ deleted: true });
    } catch (erro) {
      return res.json({ erro });
    }
  }
}

export default new ProdutoController();
