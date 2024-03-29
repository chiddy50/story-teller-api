
import { StoryTransactionService } from "../services/StoryTransactionService";
import { errorService } from "./ErrorServiceFactory";
import {
  storyTransactionRepository,
} from "./RepositoryFactory";

export const storyTransactionServiceFactory = new StoryTransactionService(
  storyTransactionRepository,
  errorService
);
