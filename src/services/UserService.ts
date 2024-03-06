import { IBase } from "../respositories/BaseRespository";
import { IAuth } from "../shared/AuthService";
import { IErrorService } from "../shared/ErrorService";
import { Response, Request } from "express";
import { RoleTypes } from "../shared/enum";
import * as R from "ramda";

export interface IUserService {
  register(req: Request, res: Response): Promise<void>;
  login(req: Request, res: Response): Promise<void>;
  getUserById(req: Request, res: Response): Promise<void>;
  getUserByEmail(req: Request, res: Response): Promise<void>;
}
export class UserService implements IUserService {
  constructor(
    private userRepo: IBase,
    private authService: IAuth,
    private errorService: IErrorService
  ) {}

  public register = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, name, password } = req.body;
      const hashed_password = await this.authService.hash(password);
      const checkEmail = await this.userRepo.getUnique({
        where: { email },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          publicKey: true,
        },
      });
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
  };

  public login = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, password } = req.body;
      const getUser: any = await this.userRepo.getUnique({
        where: { email },
        select: {
          id: true,
          name: true,
          email: true,
          publicKey: true,
          password: true,
        },
      });

      if (!getUser) throw new Error("Invalid Credentials");
      const matched = await this.authService.compare(
        password,
        getUser?.password
      );
      if (!matched) throw new Error("Invalid Credentials");
      const token = await this.authService.encrypt({
        userId: getUser.id,
        name: getUser.name,
        role: getUser.role,
      });

      const user = R.omit(["password"], getUser);
      res
        .status(201)
        .json({ data: user, error: false, message: "success", token });
    } catch (error) {
      this.errorService.handleErrorResponse(error)(res);
    }
  };

  public getUserById = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const getUser: any = await this.userRepo.getUnique({
        where: { id },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          publicKey: true,
        },
      });
      if (!getUser) throw new Error("Unable to get user");
      res.status(201).json({ data: getUser, error: false, message: "success" });
    } catch (error) {
      this.errorService.handleErrorResponse(error)(res);
    }
  };

  public getUserByEmail = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const { email } = req.params;
      const getUser: any = await this.userRepo.getUnique({
        where: { email },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          publicKey: true,
        },
      });
      if (!getUser) throw new Error("Unable to get user");
      res.status(201).json({ data: getUser, error: false, message: "success" });
    } catch (error) {
      this.errorService.handleErrorResponse(error)(res);
    }
  };
}
