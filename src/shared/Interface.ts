import { Request } from "express";
export interface IJwtPayload {
  id?: string;
  userId?: string;
  name: string;
  role?: string;
}

export interface CustomRequest extends Request {
  user?: IJwtPayload;
}
export interface GetChallengeQueryParameters {
  id?: string;
  page?: number|string;
  limit?: number|string;
  type?: 'expired' | 'active' | 'all';
  from?: string;
  to?: string;
}