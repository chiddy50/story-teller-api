import { IBase } from "../respositories/BaseRespository";
import { IErrorService } from "../shared/ErrorService";
import { Response, Request } from "express";
import { CustomRequest, GetChallengeQueryParameters, IJwtPayload } from "../shared/Interface";

export interface IChallengeService {
  create(req: CustomRequest, res: Response): Promise<void>;
  get(req: Request, res: Response): Promise<void>;
  getAll(req: Request, res: Response): Promise<void>;
  getAllUserChallenges(req: Request, res: Response): Promise<void>;  
  update(req: Request, res: Response): Promise<void>;
  getTopWinners(req: Request, res: Response): Promise<void>;
}

export class ChallengeService implements IChallengeService {
  constructor(
    private challengeRepo: IBase,
    private transactionRepo: IBase,
    private userRepo: IBase,
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

      const transaction: any = await this.transactionRepo.get({
        where: { transactionPublicId },
      });

      if (transaction) {
        const transactionUpdated = await this.transactionRepo.update({
          where: { id: transaction?.id },
          data: {
            challengeId: challenge.id
          }
        });        
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
      const { id, page = 1, limit, type, from, to }: GetChallengeQueryParameters = req.query;
      const parsedId: string | undefined = typeof id === 'string' ? id : undefined;
      const parsedPage: number = parseInt(String(page), 10);
      const parsedLimit: number = parseInt(String(limit), 10);
      
      let filterOptions: object = {};
      if (parsedId) {
        filterOptions = { userId: parsedId };
      }

      if (type === 'expired' || type === 'active') {
        const currentDate = new Date().toISOString();
        filterOptions = {
          ...filterOptions,
          date: type === 'expired' ? { lte: currentDate } : { gt: currentDate },
        };
      }

      const totalCount: number = await this.challengeRepo.count(filterOptions); // Assuming you have a method to count total challenges
      const offset = (parsedPage - 1) * parsedLimit;

      const challenges: any = await this.challengeRepo.getAll({
        where: filterOptions,
        include: {
          user: {
            select: { id: true, name: true },
          },
          stories: {
            select: { id: true, award: true },
          },
          _count: {
            select: { stories: true },
          },
        },
        orderBy: {
          createdAt: 'desc'
        },
        skip: Number(offset),
        take: Number(limit),
      });

      const totalPages: number = Math.ceil(totalCount / parsedLimit);
      const hasNextPage: boolean = parsedPage < totalPages;
      const hasPrevPage: boolean = parsedPage > 1;

      res.status(200).json({ 
        challenges, 
        totalPages, 
        hasNextPage, 
        hasPrevPage, 
        error: false, 
        message: "success" 
      });
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
        orderBy: {
          createdAt: 'desc'
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

  public getTopWinners = async (req: Request, res: Response): Promise<void> => {
    try{
      const users: any = await this.userRepo.getAll({
        select: {
          id: true,
          name: true,
          _count: {
            select: {
              stories: {
                where: {
                  award: 'FIRST'
                }
              },
            },
          },
        },
        take: 10,
      });

      users.sort((a: any, b: any) => {
        const countA = a._count.stories.length;
        const countB = b._count.stories.length;
        return countA - countB; // Change to b - a for descending order
      });

      res.status(200).json({ 
        users,
        error: false, 
        message: "success" 
      });
    } catch (error) {
      this.errorService.handleErrorResponse(error)(res);
    }
  }
}
