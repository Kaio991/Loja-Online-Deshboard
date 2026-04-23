import express from "express";
import Carrinho from "../controllers/carrinhoControllers.js";
import { verificarGerente } from "../middlewares/auth.js";
import { verificaToken } from "../middlewares/verificarToken.js";

const routerCarrinho = express.Router()

routerCarrinho
.post("/carrinho",verificaToken, Carrinho.adicionarItem )
.get("/carrinho/listar", verificaToken, Carrinho.listarProdutosCarrinho)

export default routerCarrinho;