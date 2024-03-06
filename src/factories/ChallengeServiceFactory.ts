import {
  ChallengeService,
  IChallengeService,
} from "../services/ChallengeService";
import { errorService } from "./ErrorServiceFactory";
import { challengeRepository } from "./RepositoryFactory";

export const challengeServiceFactory: IChallengeService = new ChallengeService(
  challengeRepository,
  errorService
);
