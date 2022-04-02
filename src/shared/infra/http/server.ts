import "reflect-metadata";
import express from "express";
import swaggerUi from "swagger-ui-express";

import "express-async-errors";
import swaggerFile from "../../../swagger.json";
import { asyncErrors } from "./middlewares";
import { router } from "./routes";
import "@shared/infra/typeorm";
import "../../container";
import "dotenv/config";

const app = express();

app.use(express.json());
app.use(router);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.get("/", (request, response) => response.json("Hello Browwwwwwwwwwww 🚀"));

app.use(asyncErrors);

app.listen(3333, () => console.log("Server is up 🚀 on 3333"));
