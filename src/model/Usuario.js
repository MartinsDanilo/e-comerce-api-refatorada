import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
const Schema = mongoose.Schema;

const UsuarioSchema = new mongoose.Schema(
  {
    nome: {
      type: String,
      required: [true, "não pode ficar vazio."],
    },
    email: {
      type: String,
      lowercase: true,
      unique: true,
      required: [true, "não pode ficar vazio."],
      index: true,
      match: [/\S+@\S+\.\S+/, "é inválido."],
    },
    loja: {
      type: Schema.Types.ObjectId,
      ref: "Loja",
      required: [true, "não pode ficar vazia."],
    },
    permissao: {
      type: Array,
      default: ["cliente"],
    },
    hash: { type: String },
    salt: { type: String },
    recovery: {
      type: {
        token: String,
        date: Date,
      },
      default: {},
    },
  },
  { timestamps: true }
);

//Product é o Model
export default mongoose.model("Usuario", UsuarioSchema);
