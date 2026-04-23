import jwt from "jsonwebtoken";
import ErrosApp from "../utils/appError.js";

export const verificaToken = async (req,res,next) => {
  const tokenRecebido = req.headers.authorization;

  if (!tokenRecebido) {
    throw new ErrosApp("Por favor colocar um token valido para a autorizacao, ou faca login primeiro", 401)
  }

  const token = tokenRecebido.split(" ")[1]

  try {
    const tokenValido = jwt.verify(token, process.env.SECRET)

    req.usuarioLogado = tokenValido

    next()
  } catch (error) {
    
      next(new ErrosApp("Token inválido, corrompido ou expirado!", 401));
  }

}

