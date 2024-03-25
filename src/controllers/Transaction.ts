// userRouter.ts
import express, { Router } from "express";

import { middelwareServiceFactory } from "../factories/MiddleServiceFactory";
import { transactionServiceFactory } from "../factories/TransactionServiceFactory";

const TransactionController: Router = express.Router();
TransactionController.post(
  "/create",
  middelwareServiceFactory.verfyToken2,
  transactionServiceFactory.create
);
TransactionController.get(
  "/",
  middelwareServiceFactory.verfyToken2,
  transactionServiceFactory.getAll
);
TransactionController.get(
  "/all",
  middelwareServiceFactory.verfyToken2,
  transactionServiceFactory.getAll
);
TransactionController.get(
  "/id/:id",
  middelwareServiceFactory.verfyToken2,
  transactionServiceFactory.get
);
TransactionController.put(
  "/id/:id",
  middelwareServiceFactory.verfyToken2,
  transactionServiceFactory.update
);

export default TransactionController;
