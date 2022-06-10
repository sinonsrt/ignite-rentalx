import "reflect-metadata";
import express from "express";
import swaggerUi from "swagger-ui-express";

import "express-async-errors";
import swaggerFile from "../../../swagger.json";
import { asyncErrors } from "./middlewares";
import { router } from "./routes";
import createConnection from "@shared/infra/typeorm";
import "../../container";
import "dotenv/config";

const app = express();

createConnection(process.env.DATABASE_NAME);

app.use(express.json());
app.use(router);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.get("/", (request, response) => response.json("Hello Browwwwwwwwwwww 🚀"));

app.use(asyncErrors);

export { app };
