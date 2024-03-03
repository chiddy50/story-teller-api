import { MiddlewareService } from "../shared/MiddlewareService";
import { authService } from "./AuthServiceFactory";
import { errorService } from "./ErrorServiceFactory";

export const middelwareServiceFactory = new MiddlewareService(authService, errorService);
