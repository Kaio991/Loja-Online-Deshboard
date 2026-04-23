
import { Sequelize } from "sequelize";
const url = process.env.URL

const sequelize = new Sequelize(url,{
    dialect:"mysql",
    logging:false,
    dialectOptions:{
        connectTimeout: 60000
    }
})

export const conectarBanco = async () => {
    try {
        await sequelize.authenticate();
        console.log("✅ Conexão feita com o banco de dados!");

            await sequelize.sync({force:false});
        console.log("✅ Tabelas sincronizadas!");
    } catch (error) {
        console.error("❌ Erro ao conectar:", error.message);
    }
};

export default  sequelize