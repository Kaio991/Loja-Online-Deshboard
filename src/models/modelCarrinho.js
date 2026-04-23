import { DataTypes } from "sequelize";
import usuarios from "./modelUsuario.js";
import produto from "./modelProdutos.js";
import sequelize from "../db/db.js";

const itemcarrinho = sequelize.define("item_carrinho",{
    quantidade:{
        type:DataTypes.INTEGER,
        allowNull:false,
        defaultValue:1
    }
});

usuarios.belongsToMany(produto,{through: itemcarrinho});
produto.belongsToMany(usuarios,{through:itemcarrinho});

itemcarrinho.belongsTo(produto, { foreignKey: 'produtoId' });
itemcarrinho.belongsTo(usuarios, { foreignKey: 'usuarioId' });

export default itemcarrinho;