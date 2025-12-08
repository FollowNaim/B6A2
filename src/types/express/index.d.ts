import { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload & {
        name: string;
        email: string;
        role: string;
      };
    }
  }
}
