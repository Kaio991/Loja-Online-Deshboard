import sequelize from "../db/db.js";
import { DataTypes } from "sequelize";
import usuarios from "./modelUsuario.js";

const pedido = sequelize.define("pedidos",{
    valorTotal:{
        type:DataTypes.DECIMAL(10,2),
        allowNull: false
    },
    status:{
        type:DataTypes.STRING,
        defaultValue: "AGUARDANDO PAGAMENTO"
    },
    usuarioId:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:"usuarios",
            key: "id"
        }
    }
});

export default pedido;