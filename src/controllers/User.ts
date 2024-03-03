// userRouter.ts
import express, { Router, Request, Response } from "express";
import { userServiceFactory } from "../factories/UserServiceFactory";

const UserController: Router = express.Router();
UserController.post("/create", userServiceFactory.register);
UserController.post("/login", userServiceFactory.login);

export default UserController;
