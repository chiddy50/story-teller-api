// userRouter.ts
import express, { Router, Request, Response } from "express";

const UserController: Router = express.Router();
UserController.get("/", (req: Request, res: Response) => {
  res.send("GET /users");
});

export default UserController;
