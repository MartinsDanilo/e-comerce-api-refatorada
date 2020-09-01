import mongoose from "mongoose";

const UsuarioSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    senha: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});

//Product é o Model
export default mongoose.model("Usuario", UsuarioSchema);