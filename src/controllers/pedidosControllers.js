    import pedido from "../models/modelPedidos.js";
    import produto from "../models/modelProdutos.js";
    import ErrosApp from "../utils/appError.js";
    import itemcarrinho from "../models/modelCarrinho.js";
    import itemPedido from "../models/modelItemPedido.js";


    class PedidosControllers {
        static finalizarCompra = async (req, res, next) => {
            try {
                const usuarioId = req.usuarioLogado.id
                const itemNoCarrinho = await itemcarrinho.findAll(
                    {
                        where: { usuarioId },
                        include:[{
                            model:produto
                        }]
                    }
                )

                if (!itemNoCarrinho) {
                    throw new ErrosApp("Nenhum item no carrinho", 400)
                }

                let total = 0
                itemNoCarrinho.forEach(item => {
                    const precoUnitario = Number(item.produto?.preco)
                    const qtd = Number(item.quantidade)

                    if (!isNaN(precoUnitario) && !isNaN(qtd)) {
                        total += precoUnitario * qtd
                    }

                })

                if (!itemNoCarrinho || itemNoCarrinho.length === 0) {
                    throw new ErrosApp("Nenhum produto listado na lista", 400)
                }   

                const novoPedido = await pedido.create({
                    valorTotal: total,
                    usuarioId: usuarioId,
                    status:"AGUARDANDO PAGAMENTO"
                });

                
                for (const item of itemNoCarrinho) {
                
                    await itemPedido.create({
                        pedidoId: novoPedido.id,
                        produtoId: item.produto.id,
                        quantidade: item.quantidade,
                        precoUnitario: item.produto.preco
                    });

                    
                    const produtoEncontrado = await produto.findByPk(item.produto.id);
                    if (produtoEncontrado) {
                        await produtoEncontrado.update({
                            estoque: produtoEncontrado.estoque - item.quantidade
                        });
                    }
                }

                await itemcarrinho.destroy({ where: { usuarioId } })

                res.status(200).json({ novoPedido })

            } catch (error) {
                next(error)
            }
        }

        static listarMeusPedidos = async (req, res, next) => {
            try {
                const usuarioId = req.usuarioLogado.id
                const produtosDaLista = await pedido.findAll(
                    {
                        where: { usuarioId },
                        order: [["createdAt", "DESC"]]
                    }
                )

                if (produtosDaLista.length === 0) {
                    res.status(200).json({ produtosDaLista: [] })
                }

                res.status(200).json({ produtosDaLista})
            } catch (error) {
                next(error)
            }
        }
            static listarDetalheDoPedido = async (req,res,next) => {
                try {
                    const {id} = req.params
                    const usuarioId = req.usuarioLogado.id

                    if (!usuarioId) {
                        throw new ErrosApp("Usuario nao estar logado")
                    }

                    const  itens = await itemPedido.findAll(
                        {
                            where:{pedidoId: id},
                            include:[{
                                model: produto,
                                attributes:["nome","imagem"]
                            }]
                        }
                    )

                    if (!itens || itens.length === 0) {
                        throw new ErrosApp("Produto nao indentificado")
                    }

                    res.status(200).json(itens)

                    } catch (error) {
                        next(error)                
                }
        }
        static finalizarPagamentos = async (req,res,next) => {
            try {
                const {id} = req.params 
                const pedidoEncotrado = await pedido.findByPk(id);

                if (!pedidoEncotrado) {
                    throw new ErrosApp("Nenhum pedido encontrado", 404)
                }

                if (pedidoEncotrado === "PAGO") {
                    throw new ErrosApp("Pedido ja esta pago", 400)
                }

                await pedidoEncotrado.update({status:"PAGO"})

                res.status(200).json(
                    {
                        message:"Pagemento confirmado ! Seu pedido sera enviado em breve",
                        pedido: pedidoEncotrado
                    }
                )

            } catch (error) {
                next(error)                
            }
        }
    }

    export default PedidosControllers