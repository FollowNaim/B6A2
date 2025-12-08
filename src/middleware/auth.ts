import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { config } from "../config";

const auth = (...allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) {
        return res
          .status(401)
          .json({ success: false, message: "No token provided" });
      }

      const decoded = jwt.verify(
        token,
        config.jwt_secret as string
      ) as JwtPayload;

      (req as any).user = decoded as JwtPayload;

      if (!allowedRoles.includes(decoded.role)) {
        return res
          .status(403)
          .json({ success: false, message: "Forbidden access" });
      }

      next();
    } catch (err: any) {
      res.status(401).json({ success: false, message: "Invalid token" });
    }
  };
};

export default auth;
