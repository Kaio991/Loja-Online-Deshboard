    import express from "express";
    import PedidosControllers from "../controllers/pedidosControllers.js";
    import { verificaToken } from "../middlewares/verificarToken.js";
    import { verificarGerente } from "../middlewares/auth.js";

    const routerPedido = express.Router()

    routerPedido
    .post("/checkout",verificaToken,PedidosControllers.finalizarCompra)
    .get("/checkout/listar",verificaToken,PedidosControllers.listarMeusPedidos)
    .get("/checkout/detalhes/:id",verificaToken,PedidosControllers.listarDetalheDoPedido)
     .put("/checkout/pagar/:id",verificaToken,PedidosControllers.finalizarPagamentos)

    export default routerPedido;