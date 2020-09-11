const Joi = require('joi')
debugger
console.log("passei aqui")
module.exports = {
  store: {
    body: Joi.object({
      nome: Joi.string().required(),
      email: Joi.string().email().required(),
      loja: Joi.string().required(),
      senha: Joi.string()
        .regex(/^[a-zA-Z0-9]{3,30}$/)
        .required(),
      confirmarSenha: Joi.any()
        .equal(Joi.ref('senha'))
        .required(),
    })
  },
  update: {
    body: Joi.object({
      nome: Joi.string().optional(),
      email: Joi.string().email().optional(),
      senha: Joi.string()
        .regex(/^[a-zA-Z0-9]{3,30}$/)
        .required(),
      confirmarSenha: Joi.any()
        .equal(Joi.ref('senha'))
        .required(),
    })
  },
};