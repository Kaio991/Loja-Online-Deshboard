import { DataTypes } from "sequelize";
import sequelize from "../db/db.js";

const produto = sequelize.define(
    "produto",{
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descricao: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    preco: {
        type: DataTypes.DECIMAL(10, 2), 
        allowNull: false
    },
    categoria: {
        type: DataTypes.STRING,
        allowNull: false
    },
    estoque: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }

    }
);

export default produto
