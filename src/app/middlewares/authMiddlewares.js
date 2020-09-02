/*Esse middlewares fica responsavel por verificar se exite um token no Bearer do imnsominia
caso exista ele será validado, caso esteja ele permitira fazer o que for preciso onde exigir
o token*/

import jwt from "jsonwebtoken";
/*
o promisify permiti que funcoes que usar funções de calback antigas use o conceito de asyn/await
nesse caso o verify usaria o modulo antigo
*/
import {
  promisify
} from "util";

import autenticacao from "../config/secret";

export default async (req, res, next) => {
  const autorizacaoHeader = req.headers.authorization;

  if (!autorizacaoHeader) {
    return res.status(401).json({
      erro: "Token não fornecido!",
    });
  }

  const [, token] = autorizacaoHeader.split(" ");

  try {
    const decodifica = await promisify(jwt.verify)(token, autenticacao.secret);

    req.userId = decodifica.id;

    console.log("Id do token: ", req.userId);

    return next();
  } catch (error) {
    return res.status(401).json({
      error: "Token inválido",
    });
  }
};