import mongoose from "mongoose";
const Schema = mongoose.Schema;
import uniqueValidator from "mongoose-unique-validator";
import jwt from "jsonwebtoken";
const bcrypt = require("bcryptjs");
import authConfig from "../config/secret";

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
    senhaHash: {
      type: String,
      required: [true, "não pode ficar vazia."],
    },
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

UsuarioSchema.plugin(uniqueValidator, { message: "já está sendo utilizado" });

UsuarioSchema.pre("save", async function (next) {
  if (!this.isModified("senhaHash")) {
    return next();
  }
  this.senhaHash = await bcrypt.hash(this.senhaHash, 8);
});

UsuarioSchema.statics = {
    generateToken ({ id }) {
      return jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.ttl
      })
    }
}

  return jwt.sign(
    {
      id: this._id,
      email: this.email,
      nome: this.nome,
      exp: parseFloat(exp.getTime() / 1000, 10),
    },
    secret
  );
};

UsuarioSchema.methods.enviarAuthJSON = function () {
  return {
    _id: this._id,
    nome: this.nome,
    email: this.email,
    loja: this.loja,
    role: this.permissao,
    token: this.gerarToken(),
  };
};

// RECUPERACAO
// UsuarioSchema.methods.criarTokenRecuperacaoSenha = function () {
//   this.recovery = {};
//   this.recovery.token = crypto.randomBytes(16).toString("hex");
//   this.recovery.date = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
//   return this.recovery;
// };

// UsuarioSchema.methods.finalizarTokenRecuperacaoSenha = function () {
//   this.recovery = { token: null, date: null };
//   return this.recovery;
// };

//Product é o Model
export default mongoose.model("Usuario", UsuarioSchema);
