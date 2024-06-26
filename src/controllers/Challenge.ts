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
  challengeServiceFactory.getAllUserChallenges
);
ChallengeController.get(
  "/all",
  challengeServiceFactory.getAll
);
ChallengeController.get(
  "/id/:id",
  challengeServiceFactory.get
);
ChallengeController.get(
  "/top/winners",
  challengeServiceFactory.getTopWinners
);


export default ChallengeController;
