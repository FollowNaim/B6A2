import { Router } from "express";
import auth from "../../middleware/auth";
import { vehicleController } from "./vehicles.controller";

const router = Router();

router.get("/vehicles", vehicleController.getVehicles);

router.post("/vehicles", auth("admin"), vehicleController.createVehicle);

router.get("/vehicles/:vehicleId", vehicleController.getSingleVehicle);

router.put(
  "/vehicles/:vehicleId",
  auth("admin"),
  vehicleController.updateVehilce,
);

router.delete(
  "/vehicles/:vehicleId",
  auth("admin"),
  vehicleController.deleteVehicle,
);

export const vehicleRoutes = { router };
