import { TransactionService } from "../services/TransactionService";
import { errorService } from "./ErrorServiceFactory";
import {
  transactionRepository,
} from "./RepositoryFactory";

export const transactionServiceFactory = new TransactionService(
  transactionRepository,
  errorService
);
