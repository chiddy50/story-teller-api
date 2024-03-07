// userRouter.ts
import express, { Router } from "express";

import { middelwareServiceFactory } from "../factories/MiddleServiceFactory";
import { challengeServiceFactory } from "../factories/ChallengeServiceFactory";

const ChallengeController: Router = express.Router();
ChallengeController.post(
  "/create",
  middelwareServiceFactory.verfyToken,
  challengeServiceFactory.create
);
ChallengeController.get(
  "/all",
  middelwareServiceFactory.verfyToken,
  challengeServiceFactory.getAll
);
ChallengeController.get(
  "/",
  challengeServiceFactory.getAll
);
ChallengeController.get(
  "/id/:id",
  middelwareServiceFactory.verfyToken,
  challengeServiceFactory.get
);

export default ChallengeController;
