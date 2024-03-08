import { StoryService } from "../services/StoryService";
import { errorService } from "./ErrorServiceFactory";
import { challengeRepository, storyRepository, userRepository } from "./RepositoryFactory";

export const storyServiceFactory = new StoryService(
  storyRepository,
  challengeRepository,
  userRepository,
  errorService
);
