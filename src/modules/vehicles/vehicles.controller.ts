import { Request, Response } from "express";
import { vehicleServices } from "./vehicles.service";

const getVehicles = async (req: Request, res: Response) => {
  try {
    const result = await vehicleServices.getVehicles();
    if (!result.rows.length) {
      res.status(200).json({
        success: true,
        message: "No vehicles found",
        data: [],
      });
    }
    res.status(200).json({
      success: true,
      message: "Vehicles retrieved successfully",
      data: result.rows,
    });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const getSingleVehicle = async (req: Request, res: Response) => {
  const id = req.params.vehicleId;
  try {
    const result = await vehicleServices.getSingleVehicle(id as string);
    if (!result.rows.length) {
      res.status(200).json({
        success: true,
        message: "No vehicles found with this id",
        data: [],
      });
    }
    res.status(200).json({
      success: true,
      message: "Vehicle retrieved successfully",
      data: result.rows[0],
    });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const createVehicle = async (req: Request, res: Response) => {
  try {
    const result = await vehicleServices.createVehicle(req);
    res.status(200).json({
      success: true,
      message: "Vehicle created successfully",
      data: result.rows[0],
    });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const updateVehilce = async (req: Request, res: Response) => {
  try {
    const result = await vehicleServices.upadteVehicle(req);
    res.status(200).json({
      success: true,
      message: "Vehicle updated successfully",
      data: result.rows[0],
    });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const deleteVehicle = async (req: Request, res: Response) => {
  try {
    const { success, message } = await vehicleServices.deleteVehicle(
      req.params.vehicleId as string
    );

    if (!success) {
      res.status(200).json({ success, message });
    }
    res.status(200).json({
      success,
      message,
    });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const vehicleController = {
  getVehicles,
  createVehicle,
  getSingleVehicle,
  updateVehilce,
  deleteVehicle,
};
