import { Sequelize } from "sequelize";
const url = process.env.URL; // Ou process.env.DATABASE_URL, dependendo de como você salvou no Render

const sequelize = new Sequelize(url, {
    dialect: "postgres",
    logging: false,
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false // Necessário para conexões externas/seguras no Render
        }
    }
});

export const conectarBanco = async () => {
    try {
        await sequelize.authenticate();
        console.log("✅ Conexão feita com o banco de dados PostgreSQL!");

        await sequelize.sync({ force: false });
        console.log("✅ Tabelas sincronizadas!");
    } catch (error) {
        console.error("❌ Erro ao conectar:", error.message);
    }
};

export default sequelize;