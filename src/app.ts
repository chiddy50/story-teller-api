// app.ts
import express, {  } from "express";
import UserController from "./controllers/User";
import dotenv from "dotenv";
import cors from 'cors';
import ChallengeController from "./controllers/Challenge";
dotenv.config();

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.use("/", UserController);
app.use("/challenges", ChallengeController);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
