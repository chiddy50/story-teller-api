import { UserService } from "../services/UserService";
import { authService } from "./AuthServiceFactory";
import { errorService } from "./ErrorServiceFactory";
import { challengeRepository, storyRepository, transactionRepository, userRepository } from "./RepositoryFactory";

export const userServiceFactory = new UserService(
  userRepository,
  challengeRepository,
  storyRepository,
  transactionRepository,
  authService,
  errorService,
);