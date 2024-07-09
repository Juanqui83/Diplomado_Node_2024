import express from "express";//importar modulo de express
import morgan from "morgan";


const app = express();//iniciar el servidor

//import routes
import usersRoutes from "./routes/users.routes.js";
import tasksRoutes from "./routes/tasks.routes.js";
import authRoutes from "./routes/auth.routes.js";
import { authenticateToken } from "./middlewares/authenticate.middleware.js";

//Middlewares
app.use(morgan('dev'));
app.use(express.json());

//routes
app.use("/api/users/", usersRoutes);
app.use("/api/tasks/", authenticateToken ,tasksRoutes);
app.use("/api/login/", authRoutes);

export default app;//exportar el servidor (archivos de express)

