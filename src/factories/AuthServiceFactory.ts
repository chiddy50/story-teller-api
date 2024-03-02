import { Auth } from "../shared/AuthService";

const secret = (process.env.AUTH_SECRET as string) || "test";
console.log(secret);

export const authService = new Auth(secret);
