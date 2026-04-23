import jwt from "jsonwebtoken"

export const verificarGerente = async (req,res,next) => {
    
        const tokenPegado = req.headers["authorization"]    
        if (!tokenPegado) {
            return res.status(401).send("token nao inserido")
        }
        const tokenOficial = tokenPegado.split(" ")[1]
    try{
        const tokenLiberado =  jwt.verify(tokenOficial,process.env.SECRET)
        if (tokenLiberado.cargo !== "gerente") {
            return res.status(401).send("cargo invalido acesso restrito")
        }
        req.usuarioLogado = tokenLiberado
        next()
    } catch (error) {
        
        res.status(402).send("falha ao analisar token tente de novo")
    }
}