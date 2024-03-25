// userRouter.ts
import express, { Router, Request, Response } from "express";
import { userServiceFactory } from "../factories/UserServiceFactory";
import { middelwareServiceFactory } from "../factories/MiddleServiceFactory";

const UserController: Router = express.Router();
UserController.post("/register", userServiceFactory.register);
UserController.post("/login", userServiceFactory.login);
UserController.get("/id/:id", userServiceFactory.getUserById);
UserController.get("/email/:email", userServiceFactory.getUserByEmail);
UserController.post("/create/user", userServiceFactory.createNewUser);

export default UserController;
