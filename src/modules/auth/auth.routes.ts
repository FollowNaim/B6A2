import { Router } from "express";
import { authController } from "./auth.controller";

const router = Router();

router.post("/auth/signin", authController.loginUser);

export const authRoutes = { router };
