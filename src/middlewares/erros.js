export const erros = async (error,req,res,next) => {
    console.log("ERRO NO SERVIDOR", error.message);
    
    
    if (error.name === "SequelizeValidationError") {
        return res.status(400).json({
            message:"Erro de validacao de dados",
            erro: error.errors.map(err=> err.message)
        })
    }

    if (error.name === "SequelizeUniqueConstraintError") {
        return res.status(400).json({message: "Este email ja esta em uso"})
    }

    const statusCode = error.statusCode || 500
    const message = error.message || "Erro interno do servidor"


    res.status(statusCode).json(
        {
            erro:"error",
            message:error.message
        }
    )
}