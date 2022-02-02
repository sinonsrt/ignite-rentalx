import express from "express";

const app = express();

app.get("/", (request, response) => response.json("Hello Browwwwwwwwwwww 🚀"));

app.listen(3333, () => console.log("Server is up 🚀 on 3333"));
