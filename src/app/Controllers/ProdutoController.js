import Produto from "../model/Produto";
import Categoria from "../model/Categoria";
//import Categoria from "../model/Categoria";
import Avaliacao from "../model/Avaliacao";
import Variacao from "../model/Variacao";

const getSort = (sortType) => {
  switch (sortType) {
    case "alfabetica_a-z":
      return {
        titulo: 1
      };
    case "alfabetica_z-a":
      return {
        titulo: -1
      };
    case "preco-crescente":
      return {
        preco: 1
      };
    case "preco-decrescente":
      return {
        preco: -1
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
      sku
    } = req.body;
    const {
      loja
    } = req.query;

    const produto = await Produto.create({
      titulo,
      disponibilidade: true,
      descricao,
      categoria: categoriaId,
      preco,
      promocao,
      sku,
      loja
    });

    const categoria = await Categoria.findById(categoriaId);

    //push normalmente usado para colocar valores em array
    categoria.produtos.push(produto._id); //coloca o is do produto no aarai produtos de categorias(banco)

    await produto.save();

    return res.json(produto)
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
      sku
    } = req.body;
    const {
      loja
    } = req.query;

    const produto = await Produto.findById(req.params.id);

    if (!produto) {
      return res.status(400).json({
        error: "Produto não encontrado."
      });
    }
    debugger
    if (categoria && categoria.toString() !== produto.categoria.toString()) {
      console.log("Ouve Mudanca na categoria")
      await Produto.findOneAndUpdate(req.params.id, req.body);
      await Categoria.findOneAndUpdate(req.params.id, req.body);



      // const newCategoria = await Categoria.findById(categoria);

      // newCategoria.produtos.push(produto._id)


      // await newCategoria.save();

    }

    // if (oldCategoria && newCategoria) {
    //   oldCategoria.produtos = oldCategoria.produtos.filter(item => item.toString() !== produto._id.toString());
    //   newCategoria.produtos.push(produto._id);
    //   produto.categoria = categoria;

    //   await oldCategoria.save();
    //   await newCategoria.save();
    // } else if (newCategoria) {
    //   newCategoria.produtos.push(produto._id);
    //   produto.categoria = categoria;
    //   await newCategoria.save();
    // }

    return res.json("ok");
  }
}

export default new ProdutoController()