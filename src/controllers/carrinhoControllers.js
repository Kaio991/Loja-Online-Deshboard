import itemcarrinho from "../models/modelCarrinho.js";
import produto from "../models/modelProdutos.js";
import ErrosApp from "../utils/appError.js";

class Carrinho {
    static adicionarItem = async (req,res,next) => {
        try {
            const {produtoId, quantidade} = req.body
            const usuarioId = req.usuarioLogado.id

            let item = await itemcarrinho.findOne({
                where: {usuarioId, produtoId}
            })

            if (item) {
                item.quantidade += quantidade || 1

                await item.save()
            }else{
                item = await itemcarrinho.create({
                    usuarioId,
                    produtoId,
                    quantidade: quantidade || 1
                })
            }

            res.status(200).json({item})

        } catch (error) {
            next(error)
        }
    }
    static listarProdutosCarrinho = async (req,res,next) => {
        try {
            const usuarioId = req.usuarioLogado.id
            const item = await itemcarrinho.findAll({
                where:{usuarioId},
            include:[{model:produto}]
        })

            if (!item) {
                throw new ErrosApp("Nenhum produto adicionado no carrinho")
            }

            res.status(200).json({item})

        } catch (error) {
            next(error)
        }
    }
}

export default Carrinho;