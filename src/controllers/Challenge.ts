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
  "/",
  middelwareServiceFactory.verfyToken,
  challengeServiceFactory.getAll
);
ChallengeController.get(
  "/all",
  challengeServiceFactory.getAll
);
ChallengeController.get(
  "/id/:id",
  challengeServiceFactory.get
);

export default ChallengeController;
