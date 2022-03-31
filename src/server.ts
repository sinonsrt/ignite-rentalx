import "reflect-metadata";
import express from "express";
import swaggerUi from "swagger-ui-express";

import { router } from "./routes";
import swaggerFile from "./swagger.json";
import "./database";
import "./shared/container";
import "dotenv/config";

const app = express();

app.use(express.json());
app.use(router);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.get("/", (request, response) => response.json("Hello Browwwwwwwwwwww 🚀"));

app.listen(3333, () => console.log("Server is up 🚀 on 3333"));
