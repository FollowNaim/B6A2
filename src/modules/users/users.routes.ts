import Router from "express";
import auth from "../../middleware/auth";
import { usersController } from "./users.controller";

const router = Router();

router.post("/auth/signup", usersController.createUser);

router.get("/users", auth("admin"), usersController.getUsers);

router.put(
  "/users/:userId",
  auth("admin", "customer"),
  usersController.updateUser
);

router.delete("/users/:userId", auth("admin"), usersController.deleteUser);

export const userRoutes = { router };
