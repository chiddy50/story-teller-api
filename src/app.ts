// app.ts
import express, { Request, Response } from "express";
import UserController from "./controllers/User";

const app = express();
const port = 3000;

app.use(express.json());

app.get("/", UserController);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
