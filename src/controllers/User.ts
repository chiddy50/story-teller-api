// userRouter.ts
import express, { Router, Request, Response } from "express";
import { userServiceFactory } from "../factories/UserServiceFactory";

const UserController: Router = express.Router();
UserController.get("/", userServiceFactory.register);

export default UserController;
