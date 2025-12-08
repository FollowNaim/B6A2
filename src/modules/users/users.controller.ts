import { Request, Response } from "express";
import { usersServices } from "./users.service";

const createUser = async (req: Request, res: Response) => {
  try {
    const result = await usersServices.createUser(req.body);
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: result.rows[0],
    });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const getUsers = async (req: Request, res: Response) => {
  try {
    const result = await usersServices.getUsers();
    res.status(200).json({
      success: true,
      message: "Users retrieved successfully",
      data: result.rows,
    });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    const result = await usersServices.updateUser(req);
    const { success, message, data } = result;
    if (!success) {
      res.status(403).json({ success, message });
    }
    if (!data?.rowCount) {
      res.status(200).json({
        success: false,
        message: "No user found matching this id",
      });
    }
    res.status(200).json({
      success,
      message,
      data: data?.rows[0],
    });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  const id = req.params.userId as string;
  try {
    const { success, message } = await usersServices.deleteUser(id);
    if (success) {
      res.status(200).json({
        success,
        message,
      });
    } else {
      res.status(200).json({
        success,
        message,
      });
    }
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const usersController = {
  createUser,
  getUsers,
  updateUser,
  deleteUser,
};
