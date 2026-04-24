import "dotenv/config";
import express from "express";
import cors from "cors";
import path from "path"
import { fileURLToPath } from "url";
import {conectarBanco} from "./src/db/db.js";
import routerProdutos from "./src/routes/produtoRoutes.js";
import routerUsuario from "./src/routes/usuariosRoutes.js";
import routerCarrinho from "./src/routes/carrinhoRoutes.js";
import { erros } from "./src/middlewares/erros.js";
import routerPedido from "./src/routes/pedidosRoutes.js";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

app.use(cors())
app.use(express.json())
app.use(express.static(path.join(process.cwd(),"public")))
conectarBanco()
app.use(routerProdutos)
app.use(routerUsuario)
app.use(routerCarrinho)
app.use(routerPedido)

app.get("/",(req,res)=>{
    res.sendFile(path.join(process.cwd(),"public","pages","cadastro.html"))
})

app.use(erros)


const port = process.env.PORT
app.listen(port,"0.0.0.0",()=>{
    console.log(`servidor rodando em http://localhost:${port}`);  
})