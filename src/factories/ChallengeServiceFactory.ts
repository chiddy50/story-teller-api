import {
  ChallengeService,
  IChallengeService,
} from "../services/ChallengeService";
import { errorService } from "./ErrorServiceFactory";
import { challengeRepository, transactionRepository, userRepository } from "./RepositoryFactory";

export const challengeServiceFactory: IChallengeService = new ChallengeService(
  challengeRepository,
  transactionRepository,
  userRepository,
  errorService,
);
