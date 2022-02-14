import express from "express";

import { categoriesRoutes } from "./routes/categories.routes";
import { specificationsRoutes } from "./routes/specifications.routes";

const app = express();

app.use(express.json());

app.use("/categories", categoriesRoutes);
app.use("/specifications", specificationsRoutes);

app.get("/", (request, response) => response.json("Hello Browwwwwwwwwwww 🚀"));

app.listen(3333, () => console.log("Server is up 🚀 on 3333"));
