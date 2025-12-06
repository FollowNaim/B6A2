import Router from "express";
import { usersController } from "./users.controller";

const router = Router();

router.post("auth/signup", usersController.createUser);

router.get("/users", usersController.getUsers);

router.put("/users/:userId", usersController.updateUser);

router.delete("/users/:userId", usersController.deleteUser);

export const userRoutes = { router };
