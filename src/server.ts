import express from "express";

import { categoriesRoutes } from "./routes/categories.routes";

const app = express();

app.use(express.json());

app.use("/categories", categoriesRoutes);

app.get("/", (request, response) => response.json("Hello Browwwwwwwwwwww 🚀"));

app.listen(3333, () => console.log("Server is up 🚀 on 3333"));
