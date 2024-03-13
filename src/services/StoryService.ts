import { IBase } from "../respositories/BaseRespository";
import { IErrorService } from "../shared/ErrorService";
import { Response, Request } from "express";
import { CustomRequest, IJwtPayload } from "../shared/Interface";

export interface IStoryService {
  create(req: CustomRequest, res: Response): Promise<void>;
  get(req: Request, res: Response): Promise<void>;
  getAll(req: CustomRequest, res: Response): Promise<void>; 
  getAllUserStories(req: CustomRequest, res: Response): Promise<void>; 
  update(req: CustomRequest, res: Response): Promise<void>;
}
export class StoryService implements IStoryService {
  constructor(
    private storyRepo: IBase,
    private challengeRepo: IBase,
    private userRepo: IBase,
    private errorService: IErrorService
  ) {}

  public create = async (req: CustomRequest, res: Response): Promise<void> => {
    try {
      const data: any = req.body;
      const user: IJwtPayload = req.user as IJwtPayload;

      const getChallenge: any = await this.challengeRepo.get({
        where: { id: data.challengeId },
      });

      if (!getChallenge) throw new Error("Challenge not found");

      if (data.userAddress) {
        await this.userRepo.update({
          where: { id: user.userId },
          data: {
            publicKey: data.userAddress,
          },
        });
      } else {
        const getUser = this.userRepo.getUnique({
          where: {
            id: user.userId,
            NOT: {
              publicKey: null,
            },
          },
        });

        if (!getUser) throw new Error("user not found");
      }

      const newStory: any = await this.storyRepo.create({
        data: {
          userId: user.userId,
          challengeId: data.challengeId,
          story: data.story,
          projectId: getChallenge?.projectId,
        },
      });
      res.status(201).json({ newStory, error: false, message: "success" });
    } catch (error) {
      this.errorService.handleErrorResponse(error)(res);
    }
  };

  public get = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      if (!id) throw new Error("Invalid id");
      const story: any = await this.storyRepo.get({
        where: {
          id: id,
        },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              publicKey: true,
            },
          },
          challenge: true,
        },
      });

      if (!story) throw new Error("Story not found");

      const first_place_story: any = await this.storyRepo.get({
        where: {
          challengeId: story.challengeId,
          award: "FIRST",
        },
      });

      const second_place_story: any = await this.storyRepo.get({
        where: {
          challengeId: story.challengeId,
          award: "SECOND",
        },
      });

      const third_place_story: any = await this.storyRepo.get({
        where: {
          challengeId: story.challengeId,
          award: "THIRD",
        },
      });

      let response = {
        submission: story,
        first_place_story,
        second_place_story,
        third_place_story,
      };

      res.status(201).json({ response, error: false, message: "success" });
    } catch (error) {
      this.errorService.handleErrorResponse(error)(res);
    }
  };

  public getAll = async (req: CustomRequest, res: Response): Promise<void> => {
    try {
      const user: IJwtPayload = req.user as IJwtPayload;

      const challengeId = req.query.challengeId
      
      const stories: any = await this.storyRepo.getAll({
        where: {
          // userId: user.userId,
          ...(challengeId && { challengeId: challengeId })
        },
        include: {
          challenge: true,
        },
      });

      res.status(201).json({ stories, error: false, message: "success" });
    } catch (error) {
      this.errorService.handleErrorResponse(error)(res);
    }
  };

  public getAllUserStories = async (req: CustomRequest, res: Response): Promise<void> => {
    try {
      const user: IJwtPayload = req.user as IJwtPayload;
      
      const stories: any = await this.storyRepo.getAll({
        where: {
          userId: user.userId
        },
        include: {
          challenge: true,
        },
      });

      res.status(201).json({ stories, error: false, message: "success" });
    } catch (error) {
      this.errorService.handleErrorResponse(error)(res);
    }
  };

  public update = async (req: CustomRequest, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const updatedFields = req.body;
      if (!id) throw new Error("Invalid id");

      const story = await this.storyRepo.get({
        where: { id },
      });

      if (!story) throw new Error("Challenge not found");

      const updateStory: any = await this.storyRepo.update({
        where: { id },
        data: updatedFields,
      });

      res.status(201).json({ updateStory, error: false, message: "success" });
    } catch (error) {
      this.errorService.handleErrorResponse(error)(res);
    }
  };
}
