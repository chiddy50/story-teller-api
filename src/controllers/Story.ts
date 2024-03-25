// userRouter.ts
import express, { Router } from "express";

import { middelwareServiceFactory } from "../factories/MiddleServiceFactory";
import { storyServiceFactory } from "../factories/StoryServiceFactory";

const StoryController: Router = express.Router();
StoryController.post(
  "/create",
  middelwareServiceFactory.verfyToken2,
  storyServiceFactory.create
);
StoryController.get(
  "/",
  middelwareServiceFactory.verfyToken2,
  storyServiceFactory.getAllUserStories
);
StoryController.get(
  "/all",
  middelwareServiceFactory.verfyToken2,
  storyServiceFactory.getAll
);
StoryController.get(
  "/id/:id",
  middelwareServiceFactory.verfyToken2,
  storyServiceFactory.get
);
StoryController.put(
  "/id/:id",
  middelwareServiceFactory.verfyToken,
  storyServiceFactory.update
);

export default StoryController;
