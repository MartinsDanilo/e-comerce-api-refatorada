import mongoose from "mongoose";
const Schema = mongoose.Schema;
import uniqueValidator from "mongoose-unique-validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import authConfig from "../config/secret";
import { templateSettings } from "lodash";

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
    salt: {
      type: String,
    },
    recovery: {
      type: {
        token: String,
        date: Date,
      },
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

UsuarioSchema.plugin(uniqueValidator, {
  message: "já está sendo utilizado",
});

UsuarioSchema.pre("save", async function (next) {
  if (!this.isModified("senhaHash")) {
    return next();
  }
  this.senhaHash = await bcrypt.hash(this.senhaHash, 8);
});

UsuarioSchema.statics = {
  geratoken({ id }) {
    console.log({
      id,
    });
    return jwt.sign(
      {
        id,
      },
      authConfig.secret,
      {
        expiresIn: authConfig.ttl,
      }
    );
  },
};

UsuarioSchema.methods = {
  checaSenha(senha) {
    return bcrypt.compare(senha, this.senhaHash);
  },
};

// UsuarioSchema.methods.checaSenha = function (senha) {
//   return bcrypt.compare(senha, this.senhaHash);
// }

//Product é o Model
module.exports = mongoose.model("Usuario", UsuarioSchema);
