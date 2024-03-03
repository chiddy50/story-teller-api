import { Response, NextFunction } from "express";
import { IAuth } from "./AuthService";
import { CustomRequest, IJwtPayload } from "./Interface";
import { IErrorService } from "./ErrorService";



export interface IMiddlewareService {
  verfyToken(
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ): Promise<void>;
}

export class MiddlewareService implements IMiddlewareService {
  constructor(
    private authService: IAuth,
    private errorService: IErrorService
  ) {}

  public verfyToken = async (
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      let token = req.headers["authorization"];
      if (token && typeof token === "string") {
        token = token.replace("Bearer ", "");
        let user: IJwtPayload = await this.authService.decrypt(token.trim());
        req["user"] = user;
        next();
      } else {
        throw new Error("Unauthorized");
      }
    } catch (error: any) {
      this.errorService.handleErrorResponse(error.message)(res);
    }
  };
}
