import { ChallengeRepository } from "../respositories/ChallengeRepository";
import { StoryRepository } from "../respositories/StoryRepository";
import { StoryTransactionRepository } from "../respositories/StoryTransactionRepository";
import { TransactionRepository } from "../respositories/TransactionRespository";
import { UserRepository } from "../respositories/UserRepository";
import { PrismaClient } from "@prisma/client";

const prisma: any = new PrismaClient();

export const userRepository = new UserRepository(prisma);
export const challengeRepository = new ChallengeRepository(prisma);
export const storyRepository = new StoryRepository(prisma);
export const transactionRepository = new TransactionRepository(prisma);
export const storyTransactionRepository = new StoryTransactionRepository(prisma);
