import { IBase } from "../respositories/BaseRespository";
import { IErrorService } from "../shared/ErrorService";
import { Response, Request } from "express";
import { CustomRequest, IJwtPayload } from "../shared/Interface";

export interface IStoryService {
  create(req: Request, res: Response): Promise<void>;
  get(req: Request, res: Response): Promise<void>;
  update(req: Request, res: Response): Promise<void>;
}
export class StoryService implements IStoryService {
  constructor(
    private storyRepo: IBase,
    private errorService: IErrorService
  ) {}

  public create = async (req: CustomRequest, res: Response): Promise<void> => {
    try {
      const data: any = req.body;
      const user: IJwtPayload = req.user as IJwtPayload;
      const challenge: any = await this.storyRepo.create({
        userId: user.userId,
        ...data,
      });
      res.status(201).json({ challenge, error: false, message: "success" });
    } catch (error) {
      this.errorService.handleErrorResponse(error)(res);
    }
  };

  public get = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      if (!id) throw new Error("Invalid id");
      const challenge: any = await this.storyRepo.get({
        where: {
          id,
        },
      });

      res.status(201).json({ challenge, error: false, message: "success" });
    } catch (error) {
      this.errorService.handleErrorResponse(error)(res);
    }
  };

  public getAll = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.query;
      let filter: object = {};
      if (id) {
        filter = { userId: id };
      }
      const challenges: any = await this.storyRepo.getAll({
        where: filter,
        include: {
          stories: true,
        },
      });

      res.status(201).json({ challenges, error: false, message: "success" });
    } catch (error) {
      this.errorService.handleErrorResponse(error)(res);
    }
  };

  public update = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const updatedFields = req.body;
      if (!id) throw new Error("Invalid id");

      const challenge = await this.storyRepo.get({
        where: { projectId: id },
      });

      if (!challenge) throw new Error("Challenge not found");

      const updateChallenge: any = await this.storyRepo.update({
        where: { id },
        data: updatedFields,
      });

      res
        .status(201)
        .json({ updateChallenge, error: false, message: "success" });
    } catch (error) {
      this.errorService.handleErrorResponse(error)(res);
    }
  };
}
