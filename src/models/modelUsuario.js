import { DataTypes } from "sequelize";
import sequelize from "../db/db.js";

const usuarios = sequelize.define(
    "usuarios",{
        nome:{
            type:DataTypes.STRING,
            allowNull:false
        },
        idade:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        senha:{
            type: DataTypes.STRING,
            allowNull: false
        },
        email:{
            type: DataTypes.STRING,
            allowNull: false
        },
       cargo: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }
);

export default usuarios