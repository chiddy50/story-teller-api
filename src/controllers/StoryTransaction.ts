// userRouter.ts
import express, { Router } from "express";

import { middelwareServiceFactory } from "../factories/MiddleServiceFactory";
import { storyTransactionServiceFactory } from "../factories/StoryTransactionServiceFactory";

const StoryTransactionController: Router = express.Router();
StoryTransactionController.post(
  "/create",
  middelwareServiceFactory.verfyToken,
  storyTransactionServiceFactory.create
);
StoryTransactionController.get(
  "/",
  middelwareServiceFactory.verfyToken,
  storyTransactionServiceFactory.getAll
);
StoryTransactionController.get(
  "/all",
  middelwareServiceFactory.verfyToken,
  storyTransactionServiceFactory.getAll
);
StoryTransactionController.get(
  "/id/:id",
  middelwareServiceFactory.verfyToken,
  storyTransactionServiceFactory.get
);
StoryTransactionController.put(
  "/id/:id",
  middelwareServiceFactory.verfyToken,
  storyTransactionServiceFactory.update
);

export default StoryTransactionController;
