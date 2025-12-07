import { Router } from "express";
import { vehicleController } from "./vehicles.controller";

const router = Router();

router.get("/vehicles", vehicleController.getVehicles);

router.post("/vehicles", vehicleController.createVehicle);

router.get("/vehicles/:vehicleId", vehicleController.getSingleVehicle);

router.put("/vehicles/:vehicleId", vehicleController.updateVehilce);

router.delete("/vehicles/:vehicleId", vehicleController.deleteVehicle);

export const vehicleRoutes = { router };
