// app.ts
import express, {  } from "express";
import UserController from "./controllers/User";
import dotenv from "dotenv";
import cors from 'cors';
import ChallengeController from "./controllers/Challenge";
import TransactionController from "./controllers/Transaction";
import StoryController from "./controllers/Story";
dotenv.config();

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.use("/", UserController);
app.use("/challenges", ChallengeController);
app.use("/transactions", TransactionController);
app.use("/stories", StoryController);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
