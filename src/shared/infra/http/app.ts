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
import "@config/auth";
import upload from "@config/upload";

const app = express();

createConnection(process.env.DATABASE_NAME);

app.use(express.json());

app.use(router);

app.use("/avatar", express.static(`${upload.tmpFolder}/avatar`));
app.use("/cars", express.static(`${upload.tmpFolder}/cars`));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.get("/", (request, response) => response.json("Hello Browwwwwwwwwwww 🚀"));

app.use(asyncErrors);

export { app };
