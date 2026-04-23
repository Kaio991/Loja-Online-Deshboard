import express from "express";
import ProdutoController from "../controllers/produtosControllers.js";
import { verificarGerente } from "../middlewares/auth.js";
import { verificaToken } from "../middlewares/verificarToken.js";
const routerProdutos = express.Router()

routerProdutos
//publicas
    .get("/produtos/listar", ProdutoController.listarProduto)
    .get("/produtos/:id", ProdutoController.listarProdutosPorId)
    
//gerentes
    .post("/produtos/criar",verificaToken,verificarGerente,ProdutoController.criarProduto)
    .put("/produtos/atualizar/:id",verificaToken,verificarGerente,ProdutoController.AtualizarProduto)
    .delete("/produtos/deletar/:id",verificaToken,verificarGerente,ProdutoController.deletarProduto)

 export default routerProdutos