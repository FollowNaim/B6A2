import { Request, Response } from "express";
import { authServices } from "./auth.service";

const loginUser = async (req: Request, res: Response) => {
  try {
    const { decryptPassword, token, user } = await authServices.loginUser(req);
    if (decryptPassword) {
      res.status(200).json({
        success: true,
        message: "Login successful",
        token,
        user,
      });
    } else {
      res.status(401).json({ success: false, message: "Unauthorized" });
    }
  } catch (err: any) {
    res.status(200).json({ success: false, message: err.message });
  }
};

export const authController = { loginUser };
