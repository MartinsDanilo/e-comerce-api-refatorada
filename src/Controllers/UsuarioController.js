class UsuarioController {
    async index(req, res) {
        const {
            nome
        } = req.body;

        return res.json({
            nome
        })
    }
}

export default new UsuarioController();