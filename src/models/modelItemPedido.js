import { DataTypes } from "sequelize";
import sequelize from "../db/db.js";
import produto from "./modelProdutos.js";
import pedido from "./modelPedidos.js";

const itemPedido = sequelize.define("item_pedidos",{
    id:{
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    quantidade:{
        type:DataTypes.INTEGER,
        allowNull:false,
    },
    precoUnitario:{
        type:DataTypes.DECIMAL(10,2),
        allowNull:false
    }
});

itemPedido.belongsTo(produto, { foreignKey: 'produtoId' });
itemPedido.belongsTo(pedido, { foreignKey: 'pedidoId' });


export default itemPedido;