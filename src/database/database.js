import { Sequelize } from "sequelize";
import "dotenv/config";

export const sequelize = new Sequelize(
    process.env.DB_DATABASE,//nombre de la base de datos
    process.env.DB_USER,//usuario de la base de datos
    process.env.DB_PASSWORD,//password de la base de datos
    {
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT,
        logging:console.log,
    }
);