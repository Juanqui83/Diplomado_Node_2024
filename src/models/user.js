import { DataTypes } from "sequelize";
import { STATUS } from "../constants/index.js";
import { sequelize } from "../database/database.js";
import { Task } from "./task.js";
import { encriptar } from "../common/bycript.js";
import logger from "../logs/logger.js";

export const User = sequelize.define("users", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },

    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notNull: {
                msg: "Ingrese el Nombre del Usuario"
            },
        },

    },

    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: "Ingrese la Contraseña"
            },
        },
    },

    status: {
        type: DataTypes.STRING,
        defaultValue: STATUS.ACTIVE,
        validate: {
            isIn: {
                args: [[STATUS.ACTIVE, STATUS.INACTIVE]],
                msg: "Debe ser ${STATUS.ACTIVE} o ${STATUS.INACTIVE}",
            },
        },
    },

})

//Relación automática
//un usuario muchas tareas
User.hasMany(Task)
//pero una tarea tiene un solo usuario
Task.belongsTo(User)

User.beforeCreate(async (user) => {
    try {
        user.password = await encriptar(user.password)
     } catch (error) {
        logger.error(error.message);
        throw new Error("Error al encriptar la contraseña");
    }
})

User.beforeUpdate(async (user) => {
    try {
        user.password = await encriptar(user.password)
     } catch (error) {
        logger.error(error.message);
        throw new Error("Error al encriptar la contraseña");
    }
})
