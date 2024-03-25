import { IBase } from "../respositories/BaseRespository";
import { IErrorService } from "../shared/ErrorService";
import { Response, Request } from "express";
import { CustomRequest, IJwtPayload } from "../shared/Interface";

export interface IChallengeService {
  create(req: CustomRequest, res: Response): Promise<void>;
  get(req: Request, res: Response): Promise<void>;
  getAll(req: Request, res: Response): Promise<void>;
  getAllUserChallenges(req: Request, res: Response): Promise<void>;  
  update(req: Request, res: Response): Promise<void>;
}
export class ChallengeService implements IChallengeService {
  constructor(
    private challengeRepo: IBase,
    private transactionRepo: IBase,
    private errorService: IErrorService
  ) {}

  public create = async (req: CustomRequest, res: Response): Promise<void> => {
    try {
      const { currency, date, description, image, nftId, nftTransactionId, price, projectId, symbol, time, title, transactionPublicId }: any = req.body;

      const payload = { currency, date, description, image, nftId, nftTransactionId, price, projectId, symbol, time, title, transactionPublicId }

      const user: IJwtPayload = req.user as IJwtPayload;

      const challenge: any = await this.challengeRepo.create({
        data: {
          userId: user.id,
          ...payload,
        },
      });

      if (transactionPublicId) {
        // const transaction = await this.transactionRepo.getUnique({
        //   where: { transactionPublicId },
        // });
        
        // if (transaction) {
        //   const transactionUpdated = await this.transactionRepo.update({
        //     where: { transactionPublicId },
        //     data: {
        //       challengeId: challenge.id
        //     }
        //   });
        // }

      }

      res.status(201).json({ challenge, error: false, message: "success" });
    } catch (error) {
      this.errorService.handleErrorResponse(error)(res);
    }
  };

  public get = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      if (!id) throw new Error("Invalid id");
      const challenge: any = await this.challengeRepo.get({
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
      const { id, page = 1, limit, duration, from, to } = req.query;
      const parsedId: string | undefined = typeof id === 'string' ? id : undefined;
      const parsedPage: number = parseInt(page as string, 10);
      const parsedLimit: number = parseInt(limit as string, 10);

      let filter: object = {};
      if (parsedId) {
        filter = { userId: parsedId };
      }
      const totalCount: number = await this.challengeRepo.count(filter); // Assuming you have a method to count total challenges
      const offset = (parsedPage - 1) * parsedLimit;

      const challenges: any = await this.challengeRepo.getAll({
        where: filter,
        include: {
          user: {
            select: {
              id: true,
              name: true
            },
          },
          stories: {
            select: {
              id: true,
              award: true
            },
          },
          _count: {
            select: {
              stories: true,
            },
          },
        },
        skip: Number(offset),
        take: Number(limit),
      });

      const totalPages: number = Math.ceil(totalCount / parsedLimit);
      const hasNextPage: boolean = parsedPage < totalPages;
      const hasPrevPage: boolean = parsedPage > 1;

      res.status(200).json({ challenges, totalPages, hasNextPage, hasPrevPage, error: false, message: "success" });
    } catch (error) {
      this.errorService.handleErrorResponse(error)(res);
    }
  };

  public getAllUserChallenges = async (req: any, res: Response): Promise<void> => {
    try {
      const user: IJwtPayload = req.user as IJwtPayload;
      
      const { page = 1, limit } = req.query;
      const parsedPage: number = parseInt(page as string, 10); 
      const parsedLimit: number = parseInt(limit as string, 10); 

      let filter: object = { userId: user?.id };

      const totalCount: number = await this.challengeRepo.count(filter); // Assuming you have a method to count total challenges
      const offset = (parsedPage - 1) * parsedLimit;
      
      const challenges: any = await this.challengeRepo.getAll({
        where: filter,
        include: {
          user: {
            select: {
              id: true,
              name: true
            },
          },
          stories: {
            select: {
              id: true,
              award: true
            },
          },
          _count: {
            select: {
              stories: true,
            },
          },
        },
        skip: Number(offset),
        take: Number(limit),
      });

      const totalPages: number = Math.ceil(totalCount / parsedLimit);
      const hasNextPage: boolean = parsedPage < totalPages;
      const hasPrevPage: boolean = parsedPage > 1;

      res.status(200).json({ challenges, totalPages, hasNextPage, hasPrevPage, error: false, message: "success" });

    } catch (error) {
      this.errorService.handleErrorResponse(error)(res);
    }
  };

  public update = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const updatedFields = req.body;
      if (!id) throw new Error("Invalid id");

      const challenge = await this.challengeRepo.get({
        where: { projectId: id },
      });

      if (!challenge) throw new Error("Challenge not found");

      const updateChallenge: any = await this.challengeRepo.update({
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
