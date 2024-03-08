// userRouter.ts
import express, { Router } from "express";

import { middelwareServiceFactory } from "../factories/MiddleServiceFactory";
import { storyServiceFactory } from "../factories/StoryServiceFactory";

const StoryController: Router = express.Router();
StoryController.post(
  "/create",
  middelwareServiceFactory.verfyToken,
  storyServiceFactory.create
);
StoryController.get(
  "/",
  middelwareServiceFactory.verfyToken,
  storyServiceFactory.getAll
);
StoryController.get(
  "/all",
  middelwareServiceFactory.verfyToken,
  storyServiceFactory.getAll
);
StoryController.get(
  "/id/:id",
  middelwareServiceFactory.verfyToken,
  storyServiceFactory.get
);
StoryController.put(
  "/id/:id",
  middelwareServiceFactory.verfyToken,
  storyServiceFactory.update
);

export default StoryController;
