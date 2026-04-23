import usuarios from "../models/modelUsuario.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import ErrosApp from "../utils/appError.js";

class Usuarios {
    static cadastroUsuario = async (req,res,next) => {
        try {
            const {nome,idade,senha,email,cargo} = req.body
           

            if (!senha) {
                throw new ErrosApp("Por favor verificar a senha digitada")
            }
            const senhaSegura = await bcrypt.hash(senha, 10)
            const novoUsuario = await usuarios.create(
                {
                    nome,
                    idade,
                    senha:senhaSegura,
                    email,
                    cargo: cargo || "cliente"
                }
            )

            res.status(200).json({message:"cadastro realizado com sucesso"})
        } catch (error) {
            next(error)
        }
    }
       
    static loginUsuario = async (req,res,next) => {
        try {
            const {email, senha} = req.body
            const usuarioLogin = await usuarios.findOne({where : {email}})

            if (!usuarioLogin) {
                throw new ErrosApp("Usuario não encontrado por favor verificar email e senha")
            }
            const senhaComparada = await bcrypt.compare(senha, usuarioLogin.senha)
            if (!senhaComparada) {
                throw new ErrosApp("Senha incorreta tente de novo mais tarde")
            }
            const token = jwt.sign(
                {
                    id: usuarioLogin.id,
                    cargo: usuarioLogin.cargo,
                    email: usuarioLogin.email
                },
                process.env.SECRET,
                {expiresIn:"1h"}
            )
            res.status(200).json({
                message: "Login realizado com sucesso",
                token: token,
                nome: usuarioLogin.dataValues.nome, 
                cargo: usuarioLogin.cargo
        })
        } catch (error) {
            next(error)
        }
    }

    static listarUsuarios = async (req,res,next) => {
        try {
            const usuariosEncontrados = await usuarios.findAll({
                attributes:{exclude:["senha"]}
            })

            if (!usuariosEncontrados) {
                throw new ErrosApp("Nenhum usuario cadastrado no momento")
            }

            res.status(200).json({usuariosEncontrados})

        } catch (error) {
           next(error)
        }
    }
    static listarUsuarioPorId = async (req,res,next) => {
        try {
            const {id} = req.params
            const usuarioEncontrado = await usuarios.findByPk(id)

            if (!usuarioEncontrado) {
                throw new ErrosApp("Usuario não existe")
            }

            res.status(200).json({usuarioEncontrado})

        } catch (error) {
            next(error)
        }
    }
    static atualizarUsuarios = async (req,res,next)=> {
        try {
            const {id} = req.params
            const dadosPraAtualizar = await usuarios.update(req.body,{
                where: {id:id}
            });

            if (!dadosPraAtualizar) {
                throw new ErrosApp("Por favor verificar dados ou usuario não existe")
            }
            
            res.status(200).json({message:"usuario atualizado com sucesso"})

        } catch (error) {
            next(error)
        }
    }
    static deletarUsuario = async (req,res,next) => {
        try {
            const {id} = req.params
            const usuarioDeletado = await usuarios.destroy({where:{id:id}})

            if (!usuarioDeletado) {
                throw new ErrosApp("Usuario não existe")
            }

            res.status(200).json({message:"Usuario deletado com sucesso"})

        } catch (error) {
           next(error)
        }
    }
}


export default Usuarios