import mongoose from "mongoose";
const Schema = mongoose.Schema;
import mongoosePaginate from "mongoose-paginate";


const PedidoSchema = Schema({
  cliente: {
    type: Schema.Types.ObjectId,
    ref: "Cliente",
    required: true
  },
  carrinho: {
    type: [{
      produto: {
        type: Schema.Types.ObjectId,
        ref: "Produto",
        required: true
      },
      variacao: {
        type: Schema.Types.ObjectId,
        ref: "Variacao",
        required: true
      },
      produtoEstatico: {
        type: String
      },
      quantidade: {
        type: Number,
        default: 1
      },
      precoUnitario: {
        type: Number,
        required: true
      }
    }]
  },
  pagamento: {
    type: Schema.Types.ObjectId,
    ref: "Pagamento",
    required: true
  },
  entrega: {
    type: Schema.Types.ObjectId,
    ref: "Entrega",
    required: true
  },
  cancelado: {
    type: Boolean,
    default: false
  },
  loja: {
    type: Schema.Types.ObjectId,
    ref: "Loja",
    required: true
  }
}, {
  timestamps: true
});

PedidoSchema.plugin(mongoosePaginate);

export default mongoose.model("Pedido", PedidoSchema);