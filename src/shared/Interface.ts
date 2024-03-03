import { Request } from "express";
export interface IJwtPayload {
  userId: string;
  name: string;
  role: string;
}

export interface CustomRequest extends Request {
  user?: IJwtPayload;
}
