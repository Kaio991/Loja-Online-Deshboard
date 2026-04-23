import express from "express";
import Usuarios from "../controllers/usuariosControllers.js";
import { verificarGerente } from "../middlewares/auth.js";
const routerUsuario = express.Router()

routerUsuario
.post("/usuarios/cadastro",Usuarios.cadastroUsuario)
.post("/usuarios/login",Usuarios.loginUsuario)
.get("/usuarios/listar",Usuarios.listarUsuarios)
.get("/usuarios/listarId/:id",verificarGerente, Usuarios.listarUsuarioPorId)
.put("/usuarios/atualizar/:id",verificarGerente,Usuarios.atualizarUsuarios)
.delete("/usuarios/deletar/:id",verificarGerente,Usuarios.deletarUsuario)

export default routerUsuario