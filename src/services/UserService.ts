import { IBase } from "../respositories/BaseRespository";
import { IAuth } from "../shared/AuthService";
import { IErrorService } from "../shared/ErrorService";
import { Response, Request } from "express";
import { RoleTypes } from "../shared/enum";

export interface IUserService {}
export class UserService implements IUserService {
  constructor(
    private userRepo: IBase,
    private challengeRepo: IBase,
    private storyRepo: IBase,
    private transactionRepo: IBase,
    private authService: IAuth,
    private errorService: IErrorService
  ) {}

  public async register(req: Request, res: Response): Promise<void> {
    try {
      const { email, name, password } = req.body;
      const hashed_password = await this.authService.hash(password);
      const checkEmail = await this.userRepo.get({});
      if (checkEmail) throw new Error("Email already taken");

      const user: any = await this.userRepo.create({
        data: {
          name,
          email,
          password: hashed_password,
          role: RoleTypes.ADMIN,
        },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          publicKey: true,
        },
      });

      const token = await this.authService.encrypt({
        userId: user.id,
        name,
        role: user.role,
      });

      res
        .status(201)
        .json({ data: user, error: false, message: "success", token });
    } catch (error) {
      this.errorService.handleErrorResponse(error)(res);
    }
  }
}
