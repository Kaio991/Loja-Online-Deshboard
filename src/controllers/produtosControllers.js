import produto from "../models/modelProdutos.js"
import ErrosApp from "../utils/appError.js"

class ProdutoController {
    static criarProduto = async (req,res,next) => {
        try {
         const novoProduto = await produto.create(req.body)

         res.status(200).json({message: "Produto criado com sucesso"})
        } catch (error) {
         next(error)  
        }
    }
    static listarProduto = async (req,res,next) => {
        try {
            const produtosListados = await produto.findAll()

            if (!produtosListados) {
                throw new ErrosApp("Nenhum produto listado por favor tente novamnete!", 404);
                
            }

            res.status(200).json({produtosListados})
            
        } catch (error) {
            next(error)
        }
    }
    static listarProdutosPorId = async (req,res,next) => {
        try {
            const produtoPorId = await produto.findByPk(req.params.id)

            if (!produtoPorId) {
                throw new ErrosApp("Produto não encontrado por favor verificar ID", 404)
            }

            res.status(200).json({produtoPorId})
        } catch (error){
            next(error)
        }
    }
    static AtualizarProduto = async (req,res,next) => {
        try {
            const {id} = req.params
            const [produtoAtualizado] = await produto.update(req.body,{
                where:{id:id}
            });

            if (produtoAtualizado === 0) {
                 throw new  ErrosApp("produto não encontrado por favor verificar ID", 404)
            }

            res.status(200).json({message:"Produto atualizado com sucesso"})
            
        } catch (error) {
            next(error)
        }
    }
    static deletarProduto = async (req,res,next) => {
        try {
            const {id} = req.params
            const produtoDeletado = await produto.destroy({where:{id:id}})


        if (!id) {
                throw new ErrosApp("Id não foi digitado corretamente", 401)
            }

        if (!produtoDeletado) {
            throw new ErrosApp("Produto não existe ou ja foi deletado", 404)
        }

            res.status(200).json({message:"Produto deletado com sucesso"})
        } catch (error) {
            next(error)
        }
    }
}

export default ProdutoController