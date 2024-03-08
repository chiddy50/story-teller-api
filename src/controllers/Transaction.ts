// userRouter.ts
import express, { Router } from "express";

import { middelwareServiceFactory } from "../factories/MiddleServiceFactory";
import { transactionServiceFactory } from "../factories/TransactionServiceFactory";

const TransactionController: Router = express.Router();
TransactionController.post(
  "/create",
  middelwareServiceFactory.verfyToken,
  transactionServiceFactory.create
);
TransactionController.get(
  "/",
  middelwareServiceFactory.verfyToken,
  transactionServiceFactory.getAll
);
TransactionController.get(
  "/all",
  middelwareServiceFactory.verfyToken,
  transactionServiceFactory.getAll
);
TransactionController.get(
  "/id/:id",
  middelwareServiceFactory.verfyToken,
  transactionServiceFactory.get
);
TransactionController.put(
  "/id/:id",
  middelwareServiceFactory.verfyToken,
  transactionServiceFactory.update
);

export default TransactionController;
