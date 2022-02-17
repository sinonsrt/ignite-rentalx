import express from "express";

import { router } from "./routes";

const app = express();

app.use(express.json());
app.use(router);

app.get("/", (request, response) => response.json("Hello Browwwwwwwwwwww 🚀"));

app.listen(3333, () => console.log("Server is up 🚀 on 3333"));
