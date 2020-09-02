import * as Yup from "yup";
import Usuario from "../models/Usuario";

class LoginController {
  async store(req, res) {

    const {
      email
    } = req.body;

    const {
      id
    } = Usuario.findOne({
      email
    })

    debugger;

    console.log("Id do token", userId)

    const token = JwtHelper.sign(id)


    debugger;

    return res.json({
      usuario: {
        id,
        nome,
        email,
      },
      // gerando um token no momento do cadastro. O mesmo não fica armazenado
      token,
    });
  }
}
export default new LoginController();