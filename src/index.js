import app from "./app.js";//importar la app
import "dotenv/config";
import logger from "./logs/logger.js";
import { sequelize } from "./database/database.js";

async function main() {
    //iniciar el sequelize
    await sequelize.sync({force:false});

    const port = process.env.PORT;
    app.listen(port);
    console.log("Puerto: " + port);
    logger.info("Puerto: " + port);
}

main();

